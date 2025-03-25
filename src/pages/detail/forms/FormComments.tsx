import { useMutation } from '@tanstack/react-query';
import React, { useState, useEffect, useRef } from 'react';
import { create, pagination } from '../../../services/comment';
import useAuth from '../../../hooks/useAuth';
import Comment, { CommentType } from '../../../components/ui/Comment';
import clsx from 'clsx';
import { useIdentifier } from '../../../hooks/useIdentifier';
import { CommentRequest, PaginationResponse } from '../../../types/Rest';
import TextareaField from '../../../components/common/TextareaField';
import ClipIcon from '../../../components/common/icons/ClipIcon';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import SpinnerIcon from '../../../components/common/icons/SpinnerIcon';
import { useStore } from '../../../store/user';

const commentSchema = z.object({
    emails: z.array(z.string()),
    comment: z.string().nonempty(),
    files: z.array(z.object({
        FileBase64: z.string(),
        fileName: z.string()
    }))
});

const FormComments: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useStore((state) => state);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { token } = useAuth();
    const [comments, setComments] = useState<CommentType[]>([]);
    const [paginationResp, setPaginationResp] = useState<PaginationResponse>({
        hasNextPage: false,
        hasPreviousPage: false,
        page: 1,
        pageSize: 5,
        totalCount: 0
    })
    const { id } = useIdentifier();
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (id) mutation.mutate({ id, data: { pageNumber: paginationResp.page, pageSize: 5 } });
    }, [id]);

    const handleScroll = () => {

        if (!id || !paginationResp.hasNextPage) return

        if (chatContainerRef.current) {
            if (chatContainerRef.current.scrollTop === 0) {
                setPaginationResp(curr => {
                    mutation.mutate({ id, data: { pageNumber: curr.page + 1, pageSize: 5 } });
                    return {
                        ...curr,
                        page: curr.page + 1
                    }
                });
            }
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.addEventListener('scroll', handleScroll);
            return () => {
                chatContainerRef.current?.removeEventListener('scroll', handleScroll)
            };
        }
    }, [comments]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [comments]);

    const createMutation = useMutation({
        mutationKey: ['createComment'],
        mutationFn: ({ id, data }: { id: string, data: CommentRequest }) => create(token.accessToken, id, data),
        onSuccess: () => {
            console.log("form state: ", form.state.values)
            setIsSubmitting(false)
            mutation.mutate({ id: id ?? '', data: { pageNumber: 1, pageSize: (comments.length < 5 ? 5 : comments.length) - (comments.length % 5) } });
            form.reset()
        }
    });

    const mutation = useMutation({
        mutationKey: ['comentarios'],
        mutationFn: ({ id, data }: { id: string, data: Record<any, any> }) => pagination(token.accessToken, id, data),
        onSuccess: (value) => {
            setPaginationResp({
                hasNextPage: value.hasNextPage,
                hasPreviousPage: value.hasPreviousPage,
                page: value.page,
                pageSize: value.pageSize,
                totalCount: value.totalCount
            })
            const newComments = value.items.map(c => ({ title: "Respuesta", text: c.observation, addedBy: c.userName, attachs: c.files, date: c.created, isResponse: c.userName == user.userName }));
            console.log("new comments: ", newComments)

            setComments((current) => {
                (value.page * 5 - current.length % 5)
                current.slice(0, value.totalCount - value.totalCount % 5)
                if (value.page > 1) return [...current, ...newComments]
                return newComments
            })

            setLoading(false);
        }
    });

    const form = useForm({
        defaultValues: {
            emails: [
                "calidad.travesa@aldialogistica.com"
            ],
            comment: "",
            files: [] as {
                FileBase64: string,
                fileName: string
            }[]
        },
        validators: {
            onChange: commentSchema,
        },
        onSubmit: ({ value }) => {
            if (!id) return;
            console.log("Value: ", value);
            setIsSubmitting(true)
            createMutation.mutate({ id, data: value });
        }
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                form.setFieldValue("files", [
                    ...form.getFieldValue("files"),
                    {
                        FileBase64: reader.result as string,
                        fileName: file.name
                    }
                ]);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <h3 className="text-xl text-text font-bold">Información</h3>
            <div className="space-y-4">
                <h4 className="text-secn-blue font-bold">Resumen de comentarios</h4>
                <div
                    ref={chatContainerRef}
                    style={{ maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse' }}
                >
                    {comments.map((c, i) => (
                        <div className="grid grid-cols-[16px_1fr] gap-4 pr-8" key={i}>
                            <div className="flex flex-col items-center">
                                <span className={clsx("w-[2px] h-4", i != comments.length - 1 ? "bg-secn-blue" : "")}></span>
                                <span className="size-4 bg-secn-blue rounded-full shrink-0"></span>
                                {!(i == 0) && (
                                    <span className="w-[2px] h-full bg-secn-blue"></span>
                                )}
                            </div>
                            <Comment comment={c} />
                        </div>
                    ))}
                    {loading && <div>Loading more messages...</div>}
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-secn-blue font-bold">Agregar comentario de gestión</h4>
                <div className="flex flex-col gap-1">
                    <form.Field
                        name="comment"
                        children={(field) => (
                            <>
                                <label
                                    className="text-[#2F3036] text-xs font-semibold"
                                    htmlFor={field.name}
                                >Comentario de gestión</label>
                                <TextareaField
                                    name={field.name}
                                    placeholder="Ingrese aquí su comentario"
                                    value={field.state.value}
                                    error={field.state.meta.errors.length > 0}
                                    onChange={field.handleChange}
                                    onBlur={field.handleBlur}
                                />
                            </>
                        )}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <label className="border border-[#DEE5ED] rounded-lg grid place-items-center size-10 cursor-pointer">
                    <input type="file" name="" className="hidden" id="" onChange={handleFileChange} />
                    <ClipIcon className="text-black" />
                </label>
                <button className="bg-tirth text-white flex items-center h-10 px-20 rounded-lg cursor-pointer" disabled={isSubmitting} onClick={() => form.handleSubmit()}>
                    {isSubmitting ? (
                        <SpinnerIcon />
                    ) : (
                        'Enviar'
                    )}
                </button>
            </div>

        </>
    );
};

export default FormComments;