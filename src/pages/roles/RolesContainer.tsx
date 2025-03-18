import { useState } from "react";
import Select from "../../components/common/Select";
import Dashboard from "../../layouts/Dashboard";
import RoleForm from "./forms/RoleForm";
import RoleTable from "./tables/RoleTable";
import { useForm } from "@tanstack/react-form";
import { useStore } from "../../store/role";


const RolesContainer: React.FC = () => {

    const { roles } = useStore()
    const [showRoleForm, setShowRoleForm] = useState(false);

    const form = useForm({
        defaultValues: {
            role: 0
        },
    })

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
                            <form.Field
                                name="role"
                                children={(field) => (
                                    <>
                                        <label className="text-[#2F3036] text-xs font-semibold"
                                        >{field.name}</label>
                                        <Select
                                            items={roles.map(r => ({ key: r.normalizedName, value: r.roleId }))}
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

                        <RoleTable />

                    </div>
                </div>

            </div>
        </Dashboard>
    )
}

export default RolesContainer;