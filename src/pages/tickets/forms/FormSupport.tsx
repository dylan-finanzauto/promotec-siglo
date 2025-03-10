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
import { files, update } from "../../../services/ticket";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import TableSkeleton from "../../../components/common/TableSkeleton";
import TextareaField from "../../../components/common/TextareaField";
import { create as createComment } from "../../../services/comment";
import { formatearFechaISO } from "../../../util/date";
import { useAlert } from "../../../hooks/useAlert";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";

const cols = ["ID", "Archivo", "Propietario", "Fecha y hora"];

const actions = [
    {
        text: "Ver detalle",
        onClick: () => {
            console.log("Ir al detalle");
        },
    },
    {
        text: "Descargar",
        onClick: () => {
            console.log("Ir a descargar");
        },
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

type Props = {
    id: string,
    onBack: () => void,
    onCreate: () => void,
}

const SupportForm: React.FC<Props> = ({ id, onBack, onCreate }) => {

    const { token } = useAuth()
    const { addAlert } = useAlert()
    const navigate = useNavigate()
    const { emails } = useStore((state) => state);

    const form = useForm({
        defaultValues: {
            alertDate: new Date(),
            responseDate: new Date(),
            requestDate: new Date(),
            invoice: '',
            invoiceNumber: '',
            invoiceAmount: 0,
            ticketAmount: 0,
            firstPayment: 0,
            emailId: 0
        },
        onSubmit: async ({ value }) => {
            console.log("support form value: ", value)
            commentForm.handleSubmit()
            const data = {
                ...value,
                alertDate: formatearFechaISO(value.alertDate),
                responseDate: formatearFechaISO(value.responseDate),
                requestDate: formatearFechaISO(value.requestDate),
            }
            console.log("Data enviada: ", data)
            try {
                await update(token.accessToken, id, data)
                addAlert(
                    "success",
                    "Siniestro cargado exitósamente",
                    <div className="space-y-4">
                        <h6 className="font-semibold">El proceso se ha finalizado de manera exitosa.</h6>
                        <div className="">
                            <p>2024-01-5815 -- </p>
                            <p>Se ha dado respuesta a la Reclamación No. 2024-01-5815, debe ingresar a la herramienta de gestión y continuar con el proceso.</p>
                        </div>
                        <div className="">
                            <p><b>Concesionario: </b>VEHICAMINOS FORD</p>
                            <p><b>Serie: </b>1FMSK8FH5PGA87969</p>
                            <p><b>Observación: </b>Prueba</p>
                        </div>
                    </div>,
                    () => navigate({ to: "/options" }))
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
        onSubmit: ({ value }) => {
            console.log("comment value: ", value)
            createComment(token.accessToken, id, value)
        }
    })

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['files'],
        queryFn: async () => {
            const ticketFiles = await files(token.accessToken, id)
            return ticketFiles;
        },
    })

    return (
        <>
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
                        <FileUpload id={id} onUpload={() => refetch()} />
                        <div
                            className="p-5 rounded-[10px] border border-princ-blue space-y-3"
                        >
                            <h4 className="font-semibold">Documentos adjuntos</h4>

                            {isLoading ? (
                                <TableSkeleton cols={cols} rows={5} />
                            ) : data && (
                                <Table
                                    cols={cols}
                                    data={data}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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