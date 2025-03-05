import Dashboard from "../../layouts/Dashboard";
import { useStore } from "../../store/user";

const UsersContainer: React.FC = () => {

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
                        <button className="bg-white border border-tirth rounded-lg text-tirth h-10 flex items-center px-14 cursor-pointer">Historial</button>
                        <button className="bg-tirth rounded-lg h-10 flex items-center text-white px-14 cursor-pointer">Nuevo registro</button>
                    </div>

                </div>
            </div>
        </Dashboard>
    )
}

export default UsersContainer;