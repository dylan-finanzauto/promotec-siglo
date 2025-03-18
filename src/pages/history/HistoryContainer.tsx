import React from "react";
import Main from "../../layouts/Main";
import { Link } from "@tanstack/react-router";
import ChevronLeftFilledIcon from "../../components/common/icons/ChevronLeftFilledIcon";
import SearchIcon from "../../components/common/icons/SearchIcon";
import Table from "../../components/common/Table";
import Pagination from "../../components/common/Pagination";

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
        text: "Editar",
        onClick: () => {
            console.log("Detalle clicked")
        },
    },
];

const HistoryContainer: React.FC = () => {

    return (
        <Main>
            <div className="flex flex-col gap-5">
                <div className="space-y-2">
                    <Link to={"/"}>
                        <div className="text-text inline-flex items-center gap-2 font-semibold">
                            <div className="size-10 grid place-items-center">
                                <ChevronLeftFilledIcon className="" />
                            </div>
                            <h4 className="text-2xl">Historial</h4>
                        </div>
                    </Link>
                    <div className="">
                        <span className="text-text2">Usuarios</span> <b>/</b> Historial de cambios
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5">
                    <div className="space-y-5">
                        <h2 className="font-semibold">Listado de registros</h2>

                        <div
                            className="h-10 w-[200px] rounded-lg bg-[#F5F7F9] border border-[#DEE5ED] flex"
                        >
                            <input
                                className="outline-none px-4 w-[160px]"
                                type="text"
                                placeholder="Buscar..."
                                name=""
                                id=""
                            />
                            <div
                                className="size-10 border-l border-[#DEE5ED] grid place-items-center"
                            >
                                <SearchIcon className="text-[#7C93B5]" />
                            </div>
                        </div>

                        <Table cols={cols} data={data} actions={actions} />

                        <Pagination page={1} pageSize={5} totalCount={10} onPageChange={() => { }} hasNextPage={false} hasPreviousPage={false} />

                    </div>
                </div>

            </div>

        </Main>
    )
}

export default HistoryContainer;