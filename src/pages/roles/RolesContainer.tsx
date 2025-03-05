import Dashboard from "../../layouts/Dashboard";

const RolesContainer: React.FC = () => {

    return (
        <Dashboard>
            <div className="">
                <div className="flex items-center justify-between">
                    <div className="">
                        <h1 className="font-bold text-2xl text-text">Administración de roles</h1>
                        <p className="text-sm text-text2">
                            Esta es la información que tenemos para mostrarte
                        </p>
                    </div>

                    <button className="h-10 grid place-items-center bg-tirth text-white rounded-lg px-16 cursor-pointer">
                        Nuevo rol
                    </button>
                </div>
            </div>
        </Dashboard>
    )
}

export default RolesContainer;