import React, { useEffect, useState } from "react"
import DocumentIcon from "../../components/common/icons/DocumentIcon";
import XIcon from "../../components/common/icons/XIcon";
import Select from "../../components/common/Select";
import Calendar from "../../components/common/Calendar";
import clsx from "clsx";
import { useForm } from "@tanstack/react-form";
import { InputField } from "../../components/common/InputField";
import { useStore as stateStore } from "../../store/state";

type Props = {}

const Resume: React.FC<Props> = () => {

    const { states } = stateStore((state) => state)
    const [showResume, setShowResume] = useState(false);

    const form = useForm({
        defaultValues: {
            stateId: 0,
            alertDate: null as Date | null,
            number: '',
            concessionerName: '',
            vehicle: '',
            serie: '',
            attributable: '',
            advice: null as Date | null,
            preAlert: null as Date | null,
            responseTime: ''
        }
    })

    useEffect(() => {
        if (showResume) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }

        return () => {
            document.body.style.overflowY = 'auto';
        }
    }, [showResume])

    return (
        <>
            <div className="fixed top-0 right-0 z-10 h-screen flex flex-col overflow-hidden">

                <div className={clsx("mt-28 flex grow overflow-hidden", showResume ? "animate-slide-in" : "")}>

                    <button className="size-20 outline-none rounded-s-full mt-8 bg-tirth text-white grid place-items-center  cursor-pointer" onClick={() => setShowResume(true)}>
                        <DocumentIcon className="size-5" />
                    </button>

                    {showResume && (
                        <>
                            <div className="relative w-[350px] border border-princ-blue shadow-lg bg-white py-5 mr-5 rounded-[14px] flex flex-col gap-5 mb-5">
                                <div className="flex justify-between items-center text-text px-5">
                                    <h3 className="font-bold text-xl">Resumen de gestión</h3>
                                    <XIcon className="size-4 cursor-pointer" onClick={() => setShowResume(false)} />
                                </div>

                                <div className="overflow-y-auto px-5 space-y-5">
                                    <div className="space-y-4">
                                        <h4 className="text-secn-blue font-bold">Seleccione estado para la gestión</h4>
                                        <div className="">
                                            <div className="flex flex-col gap-1">
                                                <form.Field
                                                    name="stateId"
                                                    children={(field) => (
                                                        <>
                                                            <label className="text-[#2F3036] text-xs font-semibold"
                                                            >Estado</label>
                                                            <Select
                                                                items={states.map(s => ({ key: s.name, value: s.id }))}
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

                                        <div className="">
                                            <div className="flex flex-col gap-1">
                                                <form.Field
                                                    name="alertDate"
                                                    children={(field) => (
                                                        <>
                                                            <label className="text-[#2F3036] text-xs font-semibold"
                                                            >Hora respuesta</label>
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

                                    <div className="p-5 bg-gray1 rounded-[10px] space-y-4">
                                        <h4 className="text-secn-blue font-bold">Seleccione estado para la gestión</h4>

                                        <div className="flex flex-col gap-1">
                                            <form.Field
                                                name="number"
                                                children={(field) => (
                                                    <>
                                                        <label className="text-[#2F3036] text-xs font-semibold"
                                                        >No. Reclamo</label>
                                                        <InputField
                                                            className="bg-[#F5F7F9]"
                                                            type="text"
                                                            id={field.name}
                                                            name={field.name}
                                                            error={field.state.meta.errors.length > 0}
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                        />
                                                    </>
                                                )}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <form.Field
                                                name="concessionerName"
                                                children={(field) => (
                                                    <>
                                                        <label className="text-[#2F3036] text-xs font-semibold"
                                                        >Concesionario</label>
                                                        <InputField
                                                            className="bg-[#F5F7F9]"
                                                            type="text"
                                                            id={field.name}
                                                            name={field.name}
                                                            error={field.state.meta.errors.length > 0}
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                        />
                                                    </>
                                                )}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <form.Field
                                                name="vehicle"
                                                children={(field) => (
                                                    <>
                                                        <label className="text-[#2F3036] text-xs font-semibold"
                                                        >Vehículo</label>
                                                        <InputField
                                                            className="bg-[#F5F7F9]"
                                                            type="text"
                                                            id={field.name}
                                                            name={field.name}
                                                            error={field.state.meta.errors.length > 0}
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                        />
                                                    </>
                                                )}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <form.Field
                                                name="serie"
                                                children={(field) => (
                                                    <>
                                                        <label className="text-[#2F3036] text-xs font-semibold"
                                                        >Serie</label>
                                                        <InputField
                                                            className="bg-[#F5F7F9]"
                                                            type="text"
                                                            id={field.name}
                                                            name={field.name}
                                                            error={field.state.meta.errors.length > 0}
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                        />
                                                    </>
                                                )}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <form.Field
                                                name="attributable"
                                                children={(field) => (
                                                    <>
                                                        <label className="text-[#2F3036] text-xs font-semibold"
                                                        >Atribuible</label>
                                                        <InputField
                                                            className="bg-[#F5F7F9]"
                                                            type="text"
                                                            id={field.name}
                                                            name={field.name}
                                                            error={field.state.meta.errors.length > 0}
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                        />
                                                    </>
                                                )}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <form.Field
                                                name="advice"
                                                children={(field) => (
                                                    <>
                                                        <label className="text-[#2F3036] text-xs font-semibold"
                                                        >Aviso transportador</label>
                                                        <Calendar
                                                            className="bg-[#F5F7F9]"
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
                                                name="preAlert"
                                                children={(field) => (
                                                    <>
                                                        <label className="text-[#2F3036] text-xs font-semibold"
                                                        >Pre-alerta</label>
                                                        <Calendar
                                                            className="bg-[#F5F7F9]"
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
                                                name="responseTime"
                                                children={(field) => (
                                                    <>
                                                        <label className="text-[#2F3036] text-xs font-semibold"
                                                        >Tiempo respuesta PT</label>
                                                        <InputField
                                                            className="bg-[#F5F7F9]"
                                                            type="text"
                                                            id={field.name}
                                                            name={field.name}
                                                            error={field.state.meta.errors.length > 0}
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                        />
                                                    </>
                                                )}
                                            />
                                        </div>

                                        <div className="flex justify-center">
                                            <button className="h-10 bg-tirth text-white flex items-center rounded-lg px-20 cursor-pointer">Guardar</button>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </>
                    )}

                </div>

            </div>
        </>
    )
}

export default Resume;