import { useState } from "react";
import Select from "../../components/common/Select";
import Dashboard from "../../layouts/Dashboard";
import RoleForm from "./forms/RoleForm";
import RoleTable from "./tables/RoleTable";


const RolesContainer: React.FC = () => {

    const [showRoleForm, setShowRoleForm] = useState(false);

    return (
        <Dashboard>
            {showRoleForm && <RoleForm onCreate={() => { }} onCancel={() => { setShowRoleForm(false) }} />}
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div className="">
                        <h1 className="font-bold text-2xl text-text">Administración de roles</h1>
                        <p className="text-sm text-text2">
                            Esta es la información que tenemos para mostrarte
                        </p>
                    </div>

                    <button className="h-10 grid place-items-center bg-tirth text-white rounded-lg px-16 cursor-pointer" onClick={() => setShowRoleForm(true)}>
                        Nuevo rol
                    </button>
                </div>

                <div className="bg-white rounded-2xl p-5">
                    <div className="space-y-5">
                        <h2 className="font-semibold">Listado de registros</h2>

                        <div className="flex flex-col gap-1 w-sm">
                            <label className="text-[#2F3036] text-xs font-semibold"
                            >Roles creados</label>
                            <Select items={[]} />
                        </div>

                        <RoleTable />

                    </div>
                </div>

            </div>
        </Dashboard>
    )
}

export default RolesContainer;