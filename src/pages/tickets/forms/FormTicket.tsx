import TicketParts from "./TicketParts";
import { useStore as comStore } from "../../../store/company"
import { useStore as concStore } from "../../../store/concessioner"
import { useStore as tvStore } from "../../../store/typeVehicles"
import Calendar from "../../../components/common/Calendar";
import Select from "../../../components/common/Select";

type Props = {
    onNext: () => void
}

const TicketForm: React.FC<Props> = ({ onNext }) => {

    const { concessioners } = concStore((state) => state)
    const { companies } = comStore((state) => state)
    const { typeVehicles } = tvStore((state) => state)

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
                            <label className="text-[#2F3036] text-xs font-semibold"
                            >Cliente</label>
                            <Select items={companies.map(c => ({ key: c.name, value: c.id }))} />
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
                            {concessioners ? <Select items={concessioners.map(c => ({ key: c.name, value: c.id }))} /> : null}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#2F3036] text-xs font-semibold"
                            >Vehículo</label>
                            {typeVehicles ? <Select items={typeVehicles.map(c => ({ key: c.name, value: c.id }))} /> : null}
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

                <div className="flex justify-end mt-5">
                    <button className="flex items-center px-14 bg-tirth rounded-lg text-white h-10 cursor-pointer" onClick={() => onNext()}>Guardar / siguiente</button>
                </div>
            </div>
        </>
    )
}

export default TicketForm;