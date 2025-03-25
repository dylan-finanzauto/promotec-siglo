import type React from "react"
import FileUpload from "../../../components/ui/FileUpload";
import InfoCircleIcon from "../../../components/common/icons/InfoCircleIcon";
import Table from "../../../components/common/Table";
import Calendar from "../../../components/common/Calendar";
import InputTag from "../../../components/ui/InputTag";
import { useStore } from "../../../store/email";
import { useForm } from "@tanstack/react-form";
import clsx from "clsx";
import { InputField } from "../../../components/common/InputField";
import SpinnerIcon from "../../../components/common/icons/SpinnerIcon";
import { complete, downloadB64, downloadFile, files } from "../../../services/ticket";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import TableSkeleton from "../../../components/common/TableSkeleton";
import TextareaField from "../../../components/common/TextareaField";
import { create as createComment } from "../../../services/comment";
import { formatearFecha, formatearFechaISO } from "../../../util/date";
import { useAlert } from "../../../hooks/useAlert";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useIdentifier } from "../../../hooks/useIdentifier";
import { PostTicketComplete } from "../../../types/Rest";
import { downloadBase64File } from "../../../util/file";
import { z } from "zod";
import PreviewerDialog from "../../../components/ui/PreviewerDialog";
import { getMimeType } from "../../../util/mime";

interface RowFile {
    ID: string;
    Archivo: string;
    Propietario: string;
    "Fecha y hora": string;
}

const cols = ["ID", "Archivo", "Propietario", "Fecha y hora"];

type Props = {
    onBack: () => void,
    onCreate: () => void,
}

const supportSchema = z.object({
    alertDate: z.date().nullable(),
    responseDate: z.date().nullable(),
    requestDate: z.date().nullable(),
    invoice: z.string(),
    invoiceNumber: z.string(),
    invoiceAmount: z.number(),
    ticketAmount: z.number(),
    firstPayment: z.number()
})

const commentSchema = z.object({
    emails: z.array(z.string()).min(1),
    comment: z.string().nonempty(),
    files: z.array(z.object({
        FileBase64: z.string(), fileName: z.string()
    }))
})

const SupportForm: React.FC<Props> = ({ onBack, onCreate }) => {

    const [previewProps, setPreviewProps] = useState({ show: false, mediaType: '', b64: "", title: '' });
    const { id, changeId } = useIdentifier()
    const { token } = useAuth()
    const { addAlert } = useAlert()
    const navigate = useNavigate()
    const { emails } = useStore((state) => state);

    const actions = [
        {
            text: "Ver detalle",
            onClick: (row: RowFile) => {
                const fileSelected = data?.find(f => f.nodeId == row.ID)
                if (!fileSelected) return
                downloadB64(token.accessToken, fileSelected.nodeId)
                    .then(res => {
                        console.log("Ir al detalle: ", res);
                        setPreviewProps(curr => ({
                            ...curr,
                            title: res.name,
                            show: true,
                            b64: res.base64,
                            mediaType: getMimeType(res.extension)
                        }))
                    })
            },
        },
        {
            text: "Descargar",
            onClick: (row: RowFile) => {
                downloadFile(token.accessToken, row.ID)
                    .then(res => {
                        downloadBase64File('application/octet-stream', res, row.Archivo)
                    })
            }
        },
        {
            text: "Editar",
            onClick: () => {
                console.log("Ir a editar");
            },
        },
        {
            text: "Eliminar",
            onClick: () => {
                console.log("Ir a eliminar");
            },
        },
    ];

    const form = useForm({
        defaultValues: {
            alertDate: null as null | Date,
            responseDate: null as null | Date,
            requestDate: null as null | Date,
            invoice: '',
            invoiceNumber: '',
            invoiceAmount: 0,
            ticketAmount: 0,
            firstPayment: 0,
        },
        validators: {
            onChange: supportSchema
        },
        onSubmit: async ({ value }) => {
            if (!id) return

            console.log("Comentario: ", commentForm.state.values)
            if (!commentForm.state.isValid) {
                addAlert("error", "Crear siniestro", "Existen campos pendientes por diligenciar, para poder continuar con el proceso.")
                return
            }

            // commentForm.handleSubmit()
            const data = {
                ...value,
                alertDate: value.alertDate ? formatearFechaISO(value.alertDate) : null,
                responseDate: value.responseDate ? formatearFechaISO(value.responseDate) : null,
                requestDate: value.requestDate ? formatearFechaISO(value.requestDate) : null,
                comments: [
                    commentForm.state.values
                ]
            } as PostTicketComplete
            console.log("Data: ", data)
            try {
                const response = await complete(token.accessToken, id, data)
                console.log("Response: ", response)
                addAlert(
                    "success",
                    "Siniestro cargado exitósamente",
                    <div className="space-y-4">
                        <h6 className="font-semibold">El proceso se ha finalizado de manera exitosa.</h6>
                        <div className="">
                            <p>{response.sequenceId} -- </p>
                            <p>Se ha dado respuesta a la Reclamación No. {response.sequenceId}.</p>
                        </div>
                        <div className="">
                            <p><b>Concesionario: </b>{response.concessionerId}</p>
                            <p><b>Serie: </b>{response.serie}</p>
                            <p><b>Observación: </b>{response.observation}</p>
                        </div>
                    </div>,
                    () => {
                        navigate({ to: "/options" })
                        changeId(null)
                    })
                onCreate()

            } catch (e) {
                addAlert("error", "Crear siniestro", "Ocurrió un error inesperado")
            }
        }
    })

    const commentForm = useForm({
        defaultValues: {
            emails: [] as string[],
            comment: '' as string,
            files: [] as { FileBase64: string, fileName: string }[]
        },
        validators: {
            onChange: commentSchema
        },
        onSubmit: ({ value }) => {
            if (!id) return
            createComment(token.accessToken, id, value)
        }
    })

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['files'],
        queryFn: async () => {
            if (!id) return
            const ticketFiles = await files(token.accessToken, id)

            console.log("ticket files: ", ticketFiles)
            return ticketFiles;
        },
    })

    const tableFiles = useMemo(() => data?.map(f => ({
        ID: f.nodeId,
        Archivo: f.originalName,
        Propietario: f.createdBy,
        "Fecha y hora": formatearFecha(f.created)
    })), [data])

    return (
        <>
            <PreviewerDialog title={previewProps.title} b64={previewProps.b64} mediaType={previewProps.mediaType} isOpen={previewProps.show} onClose={() => setPreviewProps(v => ({ ...v, show: false }))} />
            <div className="bg-white rounded-[14px] p-5 space-y-5">
                <h3 className="text-xl text-text font-bold">
                    Formulario novedades / reclamos
                </h3>
                <div className="space-y-[10px]">
                    <h4 className="text-secn-blue font-bold">Documentos soportes</h4>
                    <div className="flex flex-col gap-8">
                        <div
                            className="p-5 bg-[#F0F2F9] rounded-[14px] flex gap-[10px] items-center"
                        >
                            <InfoCircleIcon className="text-text2 size-5" />
                            <p className="text-text2 text-xs">
                                Tener en cuenta que los documentos mínimos
                                requeridos para proceder con el reclamo son: <b
                                >DUA / Remesa / Consulta de partes Ford /
                                    Registro fotográfico / Factura de venta</b>
                            </p>
                        </div>
                        {id && <FileUpload url={`${import.meta.env.VITE_API_URL}/ticket/add-files/${id}`} onUpload={() => refetch()} />}
                        <div
                            className="p-5 rounded-[10px] border border-princ-blue space-y-3"
                        >
                            <h4 className="font-semibold">Documentos adjuntos</h4>

                            {isLoading ? (
                                <TableSkeleton cols={cols} rows={5} />
                            ) : tableFiles && (
                                <Table
                                    cols={cols}
                                    data={tableFiles}
                                    actions={actions}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-secn-blue font-bold">VoBo. Reclamado</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1">
                            <form.Field
                                name="alertDate"
                                children={(field) => (
                                    <>
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Aviso transportador</label>
                                        <Calendar
                                            name={field.name}
                                            value={field.state.value}
                                            error={field.state.meta.errors.length > 0}
                                            onChange={field.handleChange}
                                            onBlur={field.handleBlur}
                                        />
                                        {/* <FieldInfo field={field} /> */}
                                    </>
                                )} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <form.Field
                                name="responseDate"
                                children={(field) => (
                                    <>
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Respuesta transportador</label>
                                        <Calendar
                                            name={field.name}
                                            value={field.state.value}
                                            error={field.state.meta.errors.length > 0}
                                            onChange={field.handleChange}
                                            onBlur={field.handleBlur}
                                        />
                                        {/* <FieldInfo field={field} /> */}
                                    </>
                                )} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <form.Field
                                name="requestDate"
                                children={(field) => (
                                    <>
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Solicitud factura concesionario</label>
                                        <Calendar
                                            name={field.name}
                                            value={field.state.value}
                                            error={field.state.meta.errors.length > 0}
                                            onChange={field.handleChange}
                                            onBlur={field.handleBlur}
                                        />
                                        {/* <FieldInfo field={field} /> */}
                                    </>
                                )} />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-secn-blue font-bold">Factura concesionario</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1">
                            <form.Field
                                name="invoice"
                                children={(field) => (
                                    <>
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Recibo factura</label>
                                        <InputField
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            error={field.state.meta.errors.length > 0}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {/* <FieldInfo field={field} /> */}
                                    </>
                                )} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <form.Field
                                name="invoiceNumber"
                                children={(field) => (
                                    <>
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Número factura</label>
                                        <InputField
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            error={field.state.meta.errors.length > 0}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {/* <FieldInfo field={field} /> */}
                                    </>
                                )} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <form.Field
                                name="invoiceAmount"
                                children={(field) => (
                                    <>
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Vr. factura</label>
                                        <InputField
                                            type="number"
                                            id={field.name}
                                            name={field.name}
                                            error={field.state.meta.errors.length > 0}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                        />
                                        {/* <FieldInfo field={field} /> */}
                                    </>
                                )} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <form.Field
                                name="ticketAmount"
                                children={(field) => (
                                    <>
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Valor reclamo</label>
                                        <InputField
                                            type="number"
                                            id={field.name}
                                            name={field.name}
                                            error={field.state.meta.errors.length > 0}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                        />
                                        {/* <FieldInfo field={field} /> */}
                                    </>
                                )} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <form.Field
                                name="firstPayment"
                                children={(field) => (
                                    <>
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Valor primer tramo</label>
                                        <InputField
                                            type="number"
                                            id={field.name}
                                            name={field.name}
                                            error={field.state.meta.errors.length > 0}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                        />
                                        {/* <FieldInfo field={field} /> */}
                                    </>
                                )} />
                        </div>
                    </div>
                </div>

                <div className="p-5 bg-gray1 rounded-[10px] space-y-5">
                    <h4 className="text-text text-xl font-bold">
                        Enviar comentario de reclamación
                    </h4>
                    <div className="space-y-4">
                        <h5 className="text-secn-blue font-bold">
                            Información de la reclamación
                        </h5>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-xs" htmlFor=""
                            >Correo electrónico de quien recibirá reclamación</label>
                            <commentForm.Field
                                name="emails"
                                children={(field) => (
                                    <InputTag
                                        emails={emails.map(e => ({ key: e.id, value: e.name }))}
                                        error={field.state.meta.errors.length > 0}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={field.handleChange}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <commentForm.Field
                                name="comment"
                                children={(field) => (
                                    <>
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Comentario</label>
                                        <TextareaField
                                            name={field.name}
                                            value={field.state.value}
                                            error={field.state.meta.errors.length > 0}
                                            onChange={field.handleChange}
                                            onBlur={field.handleBlur}
                                            placeholder="Escriba reclamación aquí"
                                        />
                                    </>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-5">
                    <div className="flex gap-4">
                        <button className="flex items-center px-14 border border-tirth rounded-lg text-tirth h-10 cursor-pointer" onClick={() => onBack()}>Atrás</button>
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmitting]) => (
                                <button className="flex items-center px-14 bg-tirth rounded-lg text-white h-10 cursor-pointer" disabled={!canSubmit || isSubmitting} onClick={() => form.handleSubmit()}>
                                    {isSubmitting ? (
                                        <SpinnerIcon />
                                    ) : (
                                        'Crear'
                                    )}
                                </button>
                            )}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SupportForm;