import React, { type ReactNode, useState } from "react";
import { AlertContext, AlertType, StatusType } from "../context/AlertContext";

export function AlertProvider({ children }: { children: ReactNode }) {
    const [alerts, setAlerts] = useState<AlertType[]>([]);

    const addAlert = (status: StatusType, title: string, description: string | React.ReactNode, onConfirm?: () => void) => {
        const id = Date.now();
        setAlerts(alerts => [...alerts, { id, status, title, description, onConfirm }]);
    };

    const removeAlert = (id: number) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    return (
        <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
        </AlertContext.Provider>
    );
}
