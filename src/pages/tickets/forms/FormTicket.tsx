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
import { useState } from "react";
import { Piece, PostTicket } from "../../../types/Rest";
import { useMutation } from "@tanstack/react-query";
import { addPieces, create, update } from "../../../services/ticket";
import { Ticket } from "../../../types/Ticket";
import useAuth from "../../../hooks/useAuth";
import { formatearFechaISO } from "../../../util/date";
import { useAlert } from "../../../hooks/useAlert";

// type Props = {
//     id: string,
//     onNext: (ticket: Ticket) => void,
//     valueForm: Ticket
// }

type Props = {
    id: string,
    onSave: (id: string) => void
}

const FormTicket: React.FC<Props> = ({ onSave }) => {

    const { token } = useAuth()
    const { addAlert } = useAlert()
    const { concessioners } = concStore((state) => state)
    const { companies } = comStore((state) => state)
    const { typeVehicles } = tvStore((state) => state)
    const [pieces, setPieces] = useState<Piece[]>([])

    const form = useForm({
        defaultValues: {
            client: '',
            concessionerCode: '',
            catalog: '',
            ocurrencyDate: new Date(),
            deliveryDate: new Date(),
            preAlertDate: new Date(),
            contact: '',
            email: '',
            telefono: '',
            concessionerId: 0,
            typeVehicleId: 0,
            serie: '',
            numberDua: '',
            numberRemesa: '',
            driverName: '',
            plate: '',
        },
        onSubmit: async ({ value }) => {
            try {
                const id = await create(token.accessToken)
                console.log("id: ", id)
                const data = {
                    ...value,
                    ocurrencyDate: formatearFechaISO(value.ocurrencyDate),
                    deliveryDate: formatearFechaISO(value.deliveryDate),
                    preAlertDate: formatearFechaISO(value.preAlertDate),
                }
                console.log("Data enviada: ", data)
                await update(token.accessToken, id, data)
                await addPieces(token.accessToken, id, pieces)

                onSave(id)
            } catch (e) {
                addAlert("error", "Crear siniestro", "Ocurrió un error inesperado")
            }
        },
        onSubmitInvalid: () => {
            addAlert("error", "Crear siniestro", "Existen campos pendientes por diligenciar, para poder continuar con el proceso.")
        }
    })

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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Cliente requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Código consecionario requerido' : undefined
                                }}
                                children={(field) => (
                                    <>
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Código consecionario</label>
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                        {/* <FieldInfo field={field} /> */}
                                    </>
                                )} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <form.Field
                                name="deliveryDate"
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                        {/* <FieldInfo field={field} /> */}
                                    </>
                                )} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <form.Field
                                name="preAlertDate"
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
                                children={(field) => (
                                    <>
                                        <label htmlFor={field.name} className={clsx("text-xs font-semibold", field.state.meta.errors.length > 0 ? "text-red-500" : "text-[#2F3036]")}>Pre-alerta</label>
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
                                name="contact"
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                name="telefono"
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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
                                validators={{
                                    onChange: ({ value }) => !value ? 'Catálogo requerido' : undefined
                                }}
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