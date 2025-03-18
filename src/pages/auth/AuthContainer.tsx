import FormAuth from "./forms/FormAuth";
import { useState } from "react";
import clsx from "clsx";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import useAuth from "../../hooks/useAuth";
import { LoginResponse } from "../../types/Rest";
import { login } from "../../services/auth";
import { Role } from "../../types/Auth";
import Loader from "../../components/common/Loader";
import { useAlert } from "../../hooks/useAlert";

type Form = {
    username: string,
    password: string
}

type Props = {}

const ContainerAuth: React.FC<Props> = () => {

    const { onLogin } = useAuth();
    const { addAlert } = useAlert();
    const navigate = useNavigate();
    const [showLoader, setShowLoader] = useState(false);
    const [loginData, setLoginData] = useState<LoginResponse | null>(null); // Estado para almacenar la data

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setLoginData({
                ...data,
                role: data.roles.find(r => r.descripcion.startsWith('SGL'))?.descripcion as Role || 'SGL-Promotec'
            });
            setTimeout(() => {
                setShowLoader(true);
            }, 500);
        },
        onError: (error: AxiosError) => {
            addAlert("error", "Error", "Usuario inválido")
        },
    });

    const handleLogin = (user: Form): Promise<void> => {
        return new Promise((resolve, reject) => {
            mutation.mutate(user, {
                onSuccess: () => resolve(),
                onError: (error) => reject(error),
            });
        });
    };

    return (
        <>
            <div className="md:h-screen bg-princ-blue overflow-hidden flex justify-center p-4">
                <div className={clsx("bg-white rounded-[40px] w-7xl min-w-0 grid md:grid-cols-2 p-2", loginData !== null ? "animate-slide-down" : "")}>
                    <div className="flex justify-center items-center overflow-hidden">
                        <div className="w-sm min-w-0 py-10">
                            <FormAuth onLogin={handleLogin} />
                        </div>
                    </div>

                    <div className="relative overflow-hidden">
                        <img src={import.meta.env.VITE_PUBLIC_URL + "images/picture.png"} className="h-full w-full" alt="" />
                        <h2 className="absolute top-0 left-0 mt-[15%] ml-[15%] sm:text-3xl font-bold text-white w-1/3">Sistema de información gerencial logístico</h2>
                    </div>
                </div>
            </div>

            {showLoader && <Loader onAnimationEnd={() => {
                if (loginData) {
                    onLogin(loginData);
                    navigate({ to: '/' })
                }
            }} />}
        </>
    );
};

export default ContainerAuth;