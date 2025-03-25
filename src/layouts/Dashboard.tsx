import type React from "react";
import Wrapper from "./Wrapper";
import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useAlert } from "../hooks/useAlert";
import useIdleTimeout from "../hooks/useIdleTimeout";

type Props = {
    children: React.ReactNode;
};

const Dashboard: React.FC<Props> = ({ children }) => {
    const auth = useAuth();
    const { addAlert } = useAlert();
    const navigate = useNavigate();
    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        const { token } = auth;
        console.log("Estado del token:", token);

        if (!token.isAuthenticated && token.expired) {
            console.log("Token expirado, mostrando alerta");
            addAlert("warning", "Sesión Terminada", "La sesión expiró", () => navigate({ to: "/" }));
            setAlertShown(true)
        }
    }, [auth, alertShown]);

    const handleTimeout = () => {
        if (alertShown) return
        console.log("Tiempo de inactividad alcanzado, cerrando sesión");
        addAlert("warning", "Sesión Terminada", "La sesión expiró por inactividad", () => navigate({ to: "/" }));
        setAlertShown(true)
        auth.onLogOut();
    };

    useIdleTimeout(handleTimeout, 1000 * 60 * 15);

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