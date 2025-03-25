import { useStore as comStore } from "../../../store/company"
import { useStore as concStore } from "../../../store/concessioner"
import { useStore as tvStore } from "../../../store/typeVehicles"
import Calendar from "../../../components/common/Calendar";
import Select from "../../../components/common/Select";
import { useForm } from "@tanstack/react-form";
import clsx from "clsx";
import { InputField } from "../../../components/common/InputField";
import TableParts from "../tables/TableParts";
import SpinnerIcon from "../../../components/common/icons/SpinnerIcon";
import { useEffect, useState } from "react";
import { Piece } from "../../../types/Rest";
import { create, detail, update, pieces as ticketPieces, addPieces } from "../../../services/ticket";
import useAuth from "../../../hooks/useAuth";
import { addToDate, formatearFechaISO } from "../../../util/date";
import { useAlert } from "../../../hooks/useAlert";
import { useMutation } from "@tanstack/react-query";
import { Ticket } from "../../../types/Ticket";
import { useIdentifier } from "../../../hooks/useIdentifier";
import { z } from 'zod'

const ticketSchema = z.object({
    client: z.string(),
    concessionerCode: z.string(),
    catalog: z.string(),
    ocurrencyDate: z.date(),
    deliveryDate: z.date(),
    preAlertDate: z.date(),
    contact: z.string(),
    email: z.string().refine(value => {
        if (value && value.trim() !== "") {
            return /\S+@\S+\.\S+/.test(value);
        }
        return true;
    }),
    phone: z.string().refine(value => {
        if (value && value.trim() !== "") {
            return /^[0-9]+$/.test(value);
        }
        return true;
    }),
    concessionerId: z.number().gt(0),
    typeVehicleId: z.number().gt(0),
    serie: z.string().nonempty(),
    numberDua: z.string().nonempty(),
    numberRemesa: z.string().nonempty(),
    driverName: z.string().nonempty(),
    plate: z.string().nonempty()
})

interface PieceState extends Piece {
    id: number
}

type Props = {
    onSave: () => void
}

const FormTicket: React.FC<Props> = ({ onSave }) => {

    const [formData, setFormData] = useState<Ticket | null>(null);
    const { id, changeId } = useIdentifier();
    const { token } = useAuth()
    const { addAlert } = useAlert()
    const { concessioners } = concStore((state) => state)
    const { companies } = comStore((state) => state)
    const { typeVehicles } = tvStore((state) => state)
    const [pieces, setPieces] = useState<PieceState[]>([])
    const [piece2Edit, setPiece2Edit] = useState<PieceState | null>(null);

    useEffect(() => {
        if (!id) return

        mutation.mutate(id)
        piecesMutation.mutate(id)
    }, [id])

    const actions = [
        {
            text: "Editar",
            onClick: (row: PieceState) => {
                setPieces(curr => curr.filter((p) => {
                    return p.id != row.id
                }))
                setPiece2Edit(row)
            },
        },
        {
            text: "Eliminar",
            onClick: (row: PieceState) => {
                setPieces(curr => curr.filter((p) => {
                    return p.id != row.id
                }))
            },
        },
    ];

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
            setPieces(data.map((p, i) => ({ id: i, amount: p.amount, attributableId: p.attributableName, count: p.count, replace: p.replace, sizeDamageId: p.sizeDamageName, stateId: p.stateIdName, typeDamageId: p.typeDamageName, typePieceId: p.typePieceName, typologyId: p.typologyName })))
        }
    })

    const form = useForm({
        defaultValues: {
            client: formData?.client ?? '',
            concessionerCode: formData?.concessionerCode ?? '',
            catalog: formData?.catalog ?? '',
            ocurrencyDate: (formData?.occurrenceDate ? new Date(formData.occurrenceDate) : null) as null | Date,
            deliveryDate: (formData?.deliveryDate ? new Date(formData.deliveryDate) : null) as null | Date,
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
        validators: {
            onChange: ticketSchema
        },
        onSubmit: async ({ value }) => {
            try {

                if (pieces.length <= 0) {
                    addAlert("error", "Crear siniestro", "No ha diligenciado ninguna pieza")
                    return
                }

                const data = {
                    ...value,
                    ocurrencyDate: value.ocurrencyDate ? formatearFechaISO(value.ocurrencyDate) : '',
                    deliveryDate: value.deliveryDate ? formatearFechaISO(value.deliveryDate) : '',
                    preAlertDate: value.preAlertDate ? formatearFechaISO(value.preAlertDate) : '',
                }

                console.log("data: ", {
                    ...data,
                    pieces
                })

                if (id) {
                    await update(token.accessToken, id, data)
                    await addPieces(token.accessToken, id, pieces)
                    onSave()
                    return
                }

                const responseId = await create(token.accessToken, {
                    ...data,
                    pieces
                })

                changeId(responseId)
                onSave()
            } catch (e) {
                addAlert("error", "Crear siniestro", "Ocurrió un error inesperado")
            }
        },
        onSubmitInvalid: () => {
            addAlert("error", "Crear siniestro", "Existen campos pendientes por diligenciar, para poder continuar con el proceso.")
        }
    })

    const handleAdd = (piece: Piece) => {
        setPieces(pieces => [...pieces, { ...piece, id: pieces.length }])
        setPiece2Edit(null)
    }

    const handleTrash = () => {
        setPiece2Edit(null)
    }

    return (
        <>
            <div className="bg-white rounded-[14px] p-5 space-y-5">
                <h3 className="text-xl text-text font-bold">
                    Formulario novedades / reclamos
                </h3>
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
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>*Ocurrencia Novedad</label>
                                        <Calendar
                                            name={field.name}
                                            value={field.state.value}
                                            error={field.state.meta.errors.length > 0}
                                            maxDate={new Date()}
                                            onChange={(value) => {
                                                field.handleChange(value)
                                            }}
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
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>*Entrega Vehículo</label>
                                        <Calendar
                                            name={field.name}
                                            value={field.state.value}
                                            error={field.state.meta.errors.length > 0}
                                            maxDate={new Date()}
                                            onChange={(value) => {
                                                const limit = addToDate(form.getFieldValue('preAlertDate') as Date, -10, "days")
                                                if (value && (value < limit)) {
                                                    addAlert("info", "Tener en cuenta", "La diferencia entre la fecha de Pre-Alerta y la entrega del vehículo, no puede ser mayor a 9 día hábiles")
                                                    return;
                                                }
                                                field.handleChange(value)
                                            }}
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
                                            minDate={addToDate(new Date(), -1, "days")}
                                            maxDate={new Date()}
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
                                            maxLength={10}
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
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>*Concesionario</label>
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
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>*Vehículo</label>
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
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>*Serie</label>
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
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>*Número DUA</label>
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
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>*Número remesa</label>
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
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>*Nombre completo</label>
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
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>*Placa</label>
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

                <TableParts pieces={pieces} edit={piece2Edit} onAdd={handleAdd} actions={actions} onTrash={handleTrash} />

                <div className="flex justify-end mt-5">
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <button className="flex items-center px-14 bg-tirth rounded-lg text-white h-10 cursor-pointer" disabled={!canSubmit || isSubmitting} onClick={() => form.handleSubmit()}>
                                {isSubmitting ? (
                                    <SpinnerIcon />
                                ) : (
                                    'Guardar / siguiente'
                                )}
                            </button>
                        )}
                    />
                </div>
            </div>
        </>
    )
}

export default FormTicket;