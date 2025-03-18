import React, { useEffect, useMemo, useState } from "react";
import InfoCircleIcon from "../../../components/common/icons/InfoCircleIcon";
import FileUpload from "../../../components/ui/FileUpload";
import Table from "../../../components/common/Table";
import Calendar from "../../../components/common/Calendar";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useIdentifier } from "../../../hooks/useIdentifier";
import { detail, files, update } from "../../../services/ticket";
import useAuth from "../../../hooks/useAuth";
import { Ticket } from "../../../types/Ticket";
import TableSkeleton from "../../../components/common/TableSkeleton";
import { formatearFecha, formatearFechaISO } from "../../../util/date";
import { InputField } from "../../../components/common/InputField";
import clsx from "clsx";
import SpinnerIcon from "../../../components/common/icons/SpinnerIcon";
import { useAlert } from "../../../hooks/useAlert";

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
    onCancel: () => void
}

const FormSupport: React.FC<Props> = ({ onCancel }) => {

    const [formData, setFormData] = useState<Ticket | null>(null)

    const { id } = useIdentifier()
    const { token } = useAuth()
    const { addAlert } = useAlert()

    const mutation = useMutation({
        mutationKey: ['detail'],
        mutationFn: async (id: string) => {
            const detailTicket = await detail(token.accessToken, id)
            console.log("Detail ticket: ", detailTicket)
            return detailTicket
        },
        onSuccess: (data) => setFormData(data)
    })

    const form = useForm({
        defaultValues: {
            alertDate: (formData?.alertDate ? new Date(formData.alertDate) : null) as null | Date,
            responseDate: (formData?.responseDate ? new Date(formData.responseDate) : null) as null | Date,
            requestDate: (formData?.requestDate ? new Date(formData.requestDate) : null) as null | Date,
            invoice: formData?.inVoice ?? '',
            invoiceNumber: formData?.inVoiceNumber ?? '',
            invoiceAmount: formData?.inVoiceAmount ?? 0,
            ticketAmount: formData?.ticketAmount ?? 0,
            firstPayment: formData?.firstPayment ?? 0,
        },
        onSubmit: async ({ value }) => {
            if (!id) return
            try {
                const data = {
                    ...formData,
                    ...value,
                    alertDate: value.alertDate ? formatearFechaISO(value.alertDate) : '',
                    responseDate: value.responseDate ? formatearFechaISO(value.responseDate) : '',
                    requestDate: value.requestDate ? formatearFechaISO(value.requestDate) : '',
                }
                await update(token.accessToken, id, data)
                addAlert("success", "Actualizar ticket", "Ticket actualizado correctamente")
            } catch (e) {
                addAlert("error", "Crear siniestro", "Ocurrió un error inesperado")
            }
        }
    });

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['files'],
        queryFn: async () => {
            if (!id) return
            return await files(token.accessToken, id)
        },
    })

    const tableFiles = useMemo(() => data?.map(f => ({
        ID: f.nodeId,
        Archivo: f.originalName,
        Propietario: f.createdBy,
        "Fecha y hora": formatearFecha(f.created)
    })), [data])

    useEffect(() => {
        if (!id) return
        mutation.mutate(id)
    }, [id])

    return (
        <>
            <h3 className="text-xl text-text font-bold">Información</h3>
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

                    {id && <FileUpload id={id} onUpload={() => refetch()} />}
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
                                    <label className="text-[#2F3036] text-xs font-semibold"
                                    >Aviso transportador</label>
                                    <Calendar
                                        name={field.name}
                                        value={field.state.value}
                                        error={field.state.meta.errors.length > 0}
                                        onChange={field.handleChange}
                                        onBlur={field.handleBlur}
                                    />
                                </>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <form.Field
                            name="responseDate"
                            children={(field) => (
                                <>
                                    <label className="text-[#2F3036] text-xs font-semibold"
                                    >Respuesta transportador</label>
                                    <Calendar
                                        name={field.name}
                                        value={field.state.value}
                                        error={field.state.meta.errors.length > 0}
                                        onChange={field.handleChange}
                                        onBlur={field.handleBlur}
                                    />
                                </>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <form.Field
                            name="requestDate"
                            children={(field) => (
                                <>
                                    <label className="text-[#2F3036] text-xs font-semibold"
                                    >Solicitud factura concesionario</label>
                                    <Calendar
                                        name={field.name}
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

            <div className="flex justify-end gap-4 mt-5">
                <button className="flex items-center px-14 border border-tirth rounded-lg text-tirth h-10 cursor-pointer" onClick={() => onCancel()}>Cancelar</button>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <button className="flex items-center px-14 bg-tirth rounded-lg text-white h-10 cursor-pointer" disabled={!canSubmit || isSubmitting} onClick={() => form.handleSubmit()}>
                            {isSubmitting ? (
                                <SpinnerIcon />
                            ) : (
                                'Actualizar'
                            )}
                        </button>
                    )}
                />
            </div>
        </>
    )
}

export default FormSupport;