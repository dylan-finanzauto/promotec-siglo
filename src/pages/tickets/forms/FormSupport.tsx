import type React from "react"
import FileUpload from "../../../components/ui/FileUpload";
import InfoCircleIcon from "../../../components/common/icons/InfoCircleIcon";
import Table from "../../../components/common/Table";
import Calendar from "../../../components/common/Calendar";
import AnglesIcon from "../../../components/common/icons/AnglesIcon";
import InputTag from "../../../components/ui/InputTag";
import { useStore } from "../../../store/email";

const cols = ["ID", "Archivo", "Propietario", "Fecha y hora"];

const data = [
    {
        ID: "1",
        Archivo: "Archivo 1",
        Propietario: "Propietario 1",
        "Fecha y hora": "2021-10-10 10:00:00",
    },
    {
        ID: "2",
        Archivo: "Archivo 2",
        Propietario: "Propietario 2",
        "Fecha y hora": "2021-10-10 10:00:00",
    },
    {
        ID: "3",
        Archivo: "Archivo 3",
        Propietario: "Propietario 3",
        "Fecha y hora": "2021-10-10 10:00:00",
    },
];

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
    onBack: () => void,
    onNext: () => void
}

const SupportForm: React.FC<Props> = ({ onBack, onNext }) => {

    const { emails } = useStore((state) => state);

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
                        <FileUpload />
                        <div
                            className="p-5 rounded-[10px] border border-princ-blue space-y-3"
                        >
                            <h4 className="font-semibold">Documentos adjuntos</h4>
                            <div className="">
                                <Table
                                    cols={cols}
                                    data={data}
                                    actions={actions}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-secn-blue font-bold">VoBo. Reclamado</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-[#2F3036] text-xs font-semibold"
                            >Aviso transportador</label>
                            <Calendar />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#2F3036] text-xs font-semibold"
                            >Respuesta transportador</label>
                            <Calendar />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#2F3036] text-xs font-semibold"
                            >Solicitud factura concesionario</label>
                            <Calendar />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-secn-blue font-bold">Factura concesionario</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-[#2F3036] text-xs font-semibold"
                            >Recibo factura</label>
                            <input
                                className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#2F3036] text-xs font-semibold"
                            >Número factura</label>
                            <input
                                className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#2F3036] text-xs font-semibold"
                            >Vr. Factura</label>
                            <input
                                className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#2F3036] text-xs font-semibold"
                            >Valor reclamo</label>
                            <input
                                className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#2F3036] text-xs font-semibold"
                            >Valor primer tramo</label>
                            <input
                                className="h-10 border border-[#DEE5ED] rounded-lg px-3 py-[10px] outline-secn-blue"
                                type="text"
                                name=""
                                id=""
                            />
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
                            <InputTag emails={emails.map(e => ({ key: e.name, value: e.id }))} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-xs" htmlFor=""
                            >Comentario</label>
                            <div className="relative">
                                <AnglesIcon
                                    className="absolute left-0 top-0 mt-3 ml-3 text-[#7C93B5] pointer-events-none"
                                />
                                <textarea
                                    className="w-full px-8 py-[10px] rounded-lg outline-none bg-white border border-[#DEE5ED] min-h-24 text-sm text-[#7C93B5]"
                                    placeholder="Escriba reclamación aquí"
                                    name=""
                                    id=""></textarea>
                                <AnglesIcon
                                    className="absolute right-0 top-0 mt-3 mr-3 text-[#7C93B5] pointer-events-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-5">
                    <div className="flex gap-4">
                        <button className="flex items-center px-14 border border-tirth rounded-lg text-tirth h-10 cursor-pointer" onClick={() => onBack()}>Atrás</button>
                        <button
                            className="flex items-center px-14 bg-tirth rounded-lg text-white h-10 cursor-pointer"
                            onClick={() => onNext()}
                        >Crear</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SupportForm;