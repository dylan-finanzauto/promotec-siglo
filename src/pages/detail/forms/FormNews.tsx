import React, { useEffect, useState } from "react";
import Select from "../../../components/common/Select";
import Calendar from "../../../components/common/Calendar";
import TableParts from "../../tickets/tables/TableParts";
import { useForm } from "@tanstack/react-form";
import clsx from "clsx";
import { useIdentifier } from "../../../hooks/useIdentifier";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Ticket } from "../../../types/Ticket";
import { Piece } from "../../../types/Rest";
import { detail, pieces as ticketPieces, update } from "../../../services/ticket";
import { useStore as comStore } from "../../../store/company"
import { useStore as concStore } from "../../../store/concessioner"
import { useStore as tvStore } from "../../../store/typeVehicles"
import { InputField } from "../../../components/common/InputField";
import { addToDate, formatearFechaISO } from "../../../util/date";
import SpinnerIcon from "../../../components/common/icons/SpinnerIcon";
import { useAlert } from "../../../hooks/useAlert";

type Props = {
    onCancel: () => void
}

const FormNews: React.FC<Props> = ({ onCancel }) => {

    const { id } = useIdentifier();
    const { token } = useAuth()
    const { addAlert } = useAlert()
    const [formData, setFormData] = useState<Ticket | null>(null);
    const [pieces, setPieces] = useState<Piece[]>([])
    const { concessioners } = concStore((state) => state)
    const { companies } = comStore((state) => state)
    const { typeVehicles } = tvStore((state) => state)

    useEffect(() => {
        console.log("Id: ", id)
        if (!id) return

        console.log("Launch mutations")
        mutation.mutate(id)
        piecesMutation.mutate(id)
    }, [id])

    const mutation = useMutation({
        mutationKey: ['detail'],
        mutationFn: (id: string) => detail(token.accessToken, id),
        onSuccess: (data) => {
            console.log("data: ", data)
            setFormData(data)
        }
    })

    const piecesMutation = useMutation({
        mutationKey: ['pieces'],
        mutationFn: (id: string) => ticketPieces(token.accessToken, id),
        onSuccess: (data) => {
            // console.log("Data: ", data)
            setPieces(data.map(p => ({ amount: p.amount, attributableId: p.attributableName, count: p.count, replace: p.replace, sizeDamageId: p.sizeDamageName, stateId: p.stateIdName, typeDamageId: p.typeDamageName, typePieceId: p.typePieceName, typologyId: p.typologyName })))
        }
    })

    const form = useForm({
        defaultValues: {
            client: formData?.client ?? '',
            concessionerCode: formData?.concessionerCode ?? '',
            catalog: formData?.catalog ?? '',
            ocurrencyDate: (formData?.occurrenceDate ? new Date(formData.occurrenceDate) : null) as null | Date,
            deliveryDate: (formData?.deliveryDate ? new Date(formData.deliveryDate) : new Date()) as null | Date,
            preAlertDate: (formData?.preAlertDate ? new Date(formData.preAlertDate) : new Date()) as null | Date,
            contact: formData?.contact ?? '',
            email: formData?.email ?? '',
            phone: formData?.phone ?? '',
            concessionerId: formData?.concessionerId ?? 0,
            typeVehicleId: formData?.typeVehicleId ?? 0,
            serie: formData?.serie ?? '',
            numberDua: formData?.numberDua ?? '',
            numberRemesa: formData?.numberRemesa ?? '',
            driverName: formData?.driverName ?? '',
            plate: formData?.plate ?? '',
        },
        onSubmit: async ({ value }) => {
            if (!id) return
            try {
                const data = {
                    ...formData,
                    ...value,
                    ocurrencyDate: value.ocurrencyDate ? formatearFechaISO(value.ocurrencyDate) : '',
                    deliveryDate: value.deliveryDate ? formatearFechaISO(value.deliveryDate) : '',
                    preAlertDate: value.preAlertDate ? formatearFechaISO(value.preAlertDate) : '',
                    pieces
                }
                await update(token.accessToken, id, data)
                addAlert("success", "Actualizar ticket", "Ticket actualizado correctamente")

            } catch (e) {
                addAlert("error", "Crear siniestro", "Ocurrió un error inesperado")
            }
        }
    });

    return (
        <>
            <h3 className="text-xl text-text font-bold">Información</h3>
            <div className="space-y-4">
                <h4 className="text-secn-blue font-bold">
                    Prealerta del concesionario
                </h4>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                        <form.Field
                            name="client"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Cliente</label>
                                    <Select
                                        items={companies.map(c => ({ key: c.name, value: c.name }))}
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
                            name="concessionerCode"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Código concesionario</label>
                                    <InputField
                                        type="text"
                                        id={field.name}
                                        name={field.name}
                                        error={field.state.meta.errors.length > 0}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                    />
                                    {/* <FieldInfo field={field} /> */}
                                </>
                            )} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <form.Field
                            name="catalog"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Catálogo</label>
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
                            name="ocurrencyDate"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Ocurrencia Novedad</label>
                                    <Calendar
                                        name={field.name}
                                        value={field.state.value}
                                        error={field.state.meta.errors.length > 0}
                                        onChange={field.handleChange}
                                        onBlur={field.handleBlur}
                                    />
                                </>
                            )} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <form.Field
                            name="deliveryDate"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Entrega Vehículo</label>
                                    <Calendar
                                        name={field.name}
                                        value={field.state.value}
                                        error={field.state.meta.errors.length > 0}
                                        onChange={field.handleChange}
                                        onBlur={field.handleBlur}
                                    />
                                </>
                            )} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <form.Field
                            name="preAlertDate"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Pre-alerta</label>
                                    <Calendar
                                        name={field.name}
                                        value={field.state.value}
                                        maxDate={form.getFieldValue('deliveryDate') ? addToDate(form.getFieldValue('deliveryDate') as Date, 9, "days") : undefined}
                                        error={field.state.meta.errors.length > 0}
                                        onChange={field.handleChange}
                                        onBlur={field.handleBlur}
                                    />
                                </>
                            )} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <form.Field
                            name="contact"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Persona de contacto</label>
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
                            name="email"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>E-mail</label>
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
                            name="phone"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Teléfono</label>
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
                </div>

            </div>

            <div className="space-y-4">
                <h4 className="text-secn-blue font-bold">Datos del reclamo</h4>
                <div className="grid grid-cols-3 gap-4">

                    <div className="flex flex-col gap-1">
                        <form.Field
                            name="concessionerId"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Concesionario</label>
                                    <Select
                                        items={concessioners.map(c => ({ key: c.name, value: c.id }))}
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
                            name="typeVehicleId"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Vehículo</label>
                                    <Select
                                        items={typeVehicles.map(c => ({ key: c.name, value: c.id }))}
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
                            name="serie"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Serie</label>
                                    <InputField
                                        type="text"
                                        id={field.name}
                                        name={field.name}
                                        error={field.state.meta.errors.length > 0}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                    />
                                    {/* <FieldInfo field={field} /> */}
                                </>
                            )} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <form.Field
                            name="numberDua"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Número DUA</label>
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
                            name="numberRemesa"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Número remesa</label>
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

                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-secn-blue font-bold">Conductor</h4>
                <div className="grid grid-cols-3 gap-4">

                    <div className="flex flex-col gap-1">
                        <form.Field
                            name="driverName"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Nombre completo</label>
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
                            name="plate"
                            children={(field) => (
                                <>
                                    <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Placa</label>
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

                </div>
            </div>

            <TableParts pieces={pieces} onAdd={(piece) => setPieces(pieces => [...pieces, piece])} />

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

export default FormNews;
