import { Link } from "@tanstack/react-router";
import SearchIcon from "../../components/common/icons/SearchIcon";
import Pagination from "../../components/common/Pagination";
import Table from "../../components/common/Table";
import Dashboard from "../../layouts/Dashboard";
import { useStore } from "../../store/user";
import { useState } from "react";
import UserForm from "./dialogs/UserForm";

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

const UsersContainer: React.FC = () => {

    const [showUserForm, setShowUserForm] = useState(false);
    const user = useStore((state) => state.user)

    return (
        <Dashboard>
            <div className="space-y-5">
                <div className="flex justify-between">
                    <div className="">
                        <h1 className="font-bold text-2xl text-text">
                            Bienvenida, {`${user.name} ${user.lastName}`}
                        </h1>
                        <p className="text-sm text-text2">
                            Esta es la información que tenemos para mostrarte
                        </p>
                    </div>

                    <div className="flex gap-4 items-center">
                        <Link to={"/history/234"}>
                            <button className="bg-white border border-tirth rounded-lg text-tirth h-10 flex items-center px-14 cursor-pointer">Historial</button>
                        </Link>
                        <button className="bg-tirth rounded-lg h-10 flex items-center text-white px-14 cursor-pointer" onClick={() => setShowUserForm(true)}>Nuevo registro</button>
                    </div>

                </div>

                <div className="bg-white rounded-2xl p-5">
                    <div className="space-y-5">
                        <div className="flex justify-between">
                            <h2 className="font-semibold">Listado de registros</h2>
                            <button className="py-2 px-4 text-white bg-tirth rounded-lg cursor-pointer">Descargar Excel</button>
                        </div>

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

            {showUserForm && <UserForm onCancel={() => setShowUserForm(false)} onCreate={() => { }} />}

        </Dashboard>
    )
}

export default UsersContainer;