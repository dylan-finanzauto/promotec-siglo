import React from "react";
import Select from "../../../components/common/Select";
import Calendar from "../../../components/common/Calendar";
import TicketParts from "../../tickets/forms/TicketParts";

type Props = {}

const FormNews: React.FC<Props> = () => {
    return (
        <>
            <h3 className="text-xl text-text font-bold">Información</h3>
            <div className="space-y-4">
                <h4 className="text-secn-blue font-bold">
                    Prealerta del concesionario
                </h4>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Cliente</label>
                        <Select items={[]} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Código concesionario</label>
                        <input
                            className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Catálogo</label>
                        <input
                            className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Ocurrencia Novedad</label>
                        <Calendar />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Entrega Vehículo</label>
                        <Calendar />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Pre-alerta</label>
                        <Calendar />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Persona de contacto</label>
                        <input
                            className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >E-mail</label>
                        <input
                            className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Teléfono</label>
                        <input
                            className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>
                </div>

            </div>

            <div className="space-y-4">
                <h4 className="text-secn-blue font-bold">Datos del reclamo</h4>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Concesionario</label>
                        <Select items={[]} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Vehículo</label>
                        <Select items={[]} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Serie</label>
                        <input
                            className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Número DUA</label>
                        <input
                            className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Número remesa</label>
                        <input
                            className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-secn-blue font-bold">Conductor</h4>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Nombre completo</label>
                        <input
                            className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2F3036] text-xs font-semibold"
                        >Placa</label>
                        <input
                            className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>
                </div>
            </div>

            <TicketParts />
        </>
    )
}

export default FormNews;
