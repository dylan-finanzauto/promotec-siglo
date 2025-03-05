import React from "react";
import InfoCircleIcon from "../../../components/common/icons/InfoCircleIcon";
import FileUpload from "../../../components/ui/FileUpload";
import Table from "../../../components/common/Table";
import Calendar from "../../../components/common/Calendar";

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

type Props = {}

const FormSupport: React.FC<Props> = () => {
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

        </>
    )
}

export default FormSupport;