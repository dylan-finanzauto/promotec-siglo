import type React from "react";
import Wrapper from "./Wrapper";
import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useAlert } from "../hooks/useAlert";

type Props = {
    children: React.ReactNode;
};

const Dashboard: React.FC<Props> = ({ children }) => {
    const auth = useAuth();
    const { addAlert } = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        const { token } = auth;
        console.log("Estado del token:", token);

        if (!token.isAuthenticated && token.expired) {
            console.log("Token expirado, mostrando alerta");
            addAlert("warning", "Sesión Terminada", "La sesión expiró", () => navigate({ to: "/" }));
        }

        if (!token.isAuthenticated && !token.expired) {
            console.log("Token no autenticado y no expirado, redirigiendo");
            navigate({ to: "/" });
        }
    }, [auth]);

    return (
        <div className="grid grid-cols-1 grid-rows-[96px_1fr] min-h-screen bg-[#F0F2F9]">
            <div className="col-span-2">
                <Header />
            </div>

            <Wrapper>
                <div className="grid grid-cols-[280px_1fr] gap-5 h-full">
                    {<Sidebar />}
                    <main className="pt-5 pb-12 overflow-hidden">
                        {children}
                    </main>
                </div>
            </Wrapper>
        </div>
    );
};

export default Dashboard;