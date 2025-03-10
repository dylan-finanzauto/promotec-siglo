import React, { useState } from "react"
import DocumentIcon from "../../components/common/icons/DocumentIcon";
import XIcon from "../../components/common/icons/XIcon";
import Select from "../../components/common/Select";
import Calendar from "../../components/common/Calendar";
import clsx from "clsx";

type Props = {}

const Resume: React.FC<Props> = () => {

    const [showResume, setShowResume] = useState(false);

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
                                                <label className="text-[#2F3036] text-xs font-semibold"
                                                >Estado</label>
                                                <Select items={[]} />
                                            </div>
                                        </div>

                                        <div className="">
                                            <div className="flex flex-col gap-1">
                                                <label className="text-[#2F3036] text-xs font-semibold"
                                                >Aviso respuesta</label>
                                                <Calendar />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-gray1 rounded-[10px] space-y-4">
                                        <h4 className="text-secn-blue font-bold">Seleccione estado para la gestión</h4>

                                        <div className="flex flex-col gap-1">
                                            <label className="text-[#2F3036] text-xs font-semibold"
                                            >No. Reclamo</label>
                                            <input
                                                className="h-10 border bg-[#F5F7F9] border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                                                type="text"
                                                name=""
                                                id=""
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="text-[#2F3036] text-xs font-semibold"
                                            >Concesionario</label>
                                            <input
                                                className="h-10 border bg-[#F5F7F9] border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                                                type="text"
                                                name=""
                                                id=""
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="text-[#2F3036] text-xs font-semibold"
                                            >Vehículo</label>
                                            <input
                                                className="h-10 border bg-[#F5F7F9] border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                                                type="text"
                                                name=""
                                                id=""
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="text-[#2F3036] text-xs font-semibold"
                                            >Serie</label>
                                            <input
                                                className="h-10 border bg-[#F5F7F9] border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                                                type="text"
                                                name=""
                                                id=""
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="text-[#2F3036] text-xs font-semibold"
                                            >Atribuible</label>
                                            <input
                                                className="h-10 border bg-[#F5F7F9] border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                                                type="text"
                                                name=""
                                                id=""
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="text-[#2F3036] text-xs font-semibold"
                                            >Aviso transportador</label>
                                            <Calendar className="bg-[#F5F7F9]" />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="text-[#2F3036] text-xs font-semibold"
                                            >Pre-alerta</label>
                                            <Calendar className="bg-[#F5F7F9]" />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="text-[#2F3036] text-xs font-semibold"
                                            >Tiempo respuesta PT</label>
                                            <input
                                                className="h-10 border bg-[#F5F7F9] border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                                                type="text"
                                                name=""
                                                id=""
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