import React, { useEffect, useRef, useState } from "react";
import ClipIcon from "../../../components/common/icons/ClipIcon";
import Comment, { CommentType } from "../../../components/ui/Comment";
import clsx from "clsx";
import { useIdentifier } from "../../../hooks/useIdentifier";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { create, pagination } from "../../../services/comment";
import { useForm } from "@tanstack/react-form";
import { CommentRequest } from "../../../types/Rest";
import { z } from 'zod'
import TextareaField from "../../../components/common/TextareaField";

const commentSchema = z.object({
    emails: z.array(z.string()),
    comment: z.string().nonempty(),
    files: z.array(z.object({
        FileBase64: z.string(),
        fileName: z.string()
    }))
})

type Props = {}

const FormComments: React.FC<Props> = () => {
    const commentsContainerRef = useRef<HTMLDivElement>(null);
    const { token } = useAuth()
    const { id } = useIdentifier()
    const [comments, setComments] = useState<CommentType[]>([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (commentsContainerRef.current) {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }
    }, [comments]);

    const mutation = useMutation({
        mutationKey: ['comentarios'],
        mutationFn: ({ id, data }: { id: string, data: Record<any, any> }) => pagination(token.accessToken, id, data),
        onSuccess: (value) => {
            const newComments = value.items.map(c => ({ title: "Respuesta", text: c.observation, addedBy: c.userName, attachs: c.files, date: c.created, isResponse: false }))

            setComments((current) => {
                (page * 5 - current.length % 5)
                current.slice(0, value.totalCount - value.totalCount % 5)
                if (page > 1) return [...current, ...newComments]
                return newComments
            })
        }
    })

    const createMutation = useMutation({
        mutationKey: ['createComment'],
        mutationFn: ({ id, data }: { id: string, data: CommentRequest }) => create(token.accessToken, id, data),
        onSuccess: (value) => {
            console.log("respuesta creación: ", value)
            mutation.mutate({ id: id ?? '', data: { pageNumber: 0, pageSize: 5 } })
        }
    })

    useEffect(() => {
        if (id) mutation.mutate({ id, data: { pageNumber: page, pageSize: 5 } })
    }, [id])

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
            if (!id) return
            console.log("Value: ", value)
            createMutation.mutate({ id, data: value })
        }
    })

    const handleScroll = () => {
        const elem = commentsContainerRef.current;
        if (!elem) return
        const scrollTop = elem.scrollTop
        console.log("SCroll Top: ", scrollTop)
        if (scrollTop > 0) return

    }

    return (
        <>
            <h3 className="text-xl text-text font-bold">Información</h3>
            <div className="space-y-4">
                <h4 className="text-secn-blue font-bold">Resumen de comentarios</h4>
                <div ref={commentsContainerRef} onScroll={handleScroll} className="p-4 rounded-xl border border-[#DEE5ED] max-h-[395px] overflow-y-auto">
                    {comments.map((c, i) => (
                        <div className="grid grid-cols-[16px_1fr] gap-4" key={i}>
                            <div className="flex flex-col items-center">
                                <span className={clsx("w-[2px] h-4", i != 0 ? "bg-secn-blue" : "")}></span>
                                <span className="size-4 bg-secn-blue rounded-full shrink-0"></span>
                                {!(i == comments.length - 1) && (
                                    <span className="w-[2px] h-full bg-secn-blue"></span>
                                )}
                            </div>
                            <Comment comment={c} />
                        </div>
                    ))}
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
                <button className="border border-[#DEE5ED] rounded-lg grid place-items-center size-10 cursor-pointer">
                    <ClipIcon className="text-black" />
                </button>
                <button className="bg-tirth text-white flex items-center h-10 px-20 rounded-lg cursor-pointer" onClick={() => form.handleSubmit()}>Enviar</button>
            </div>

        </>
    )
}

export default FormComments;