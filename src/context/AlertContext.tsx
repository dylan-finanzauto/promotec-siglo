import { createContext } from "react";

export type StatusType = "success" | "error" | "warning" | "info"

export type AlertType = {
    id: number;
    status: StatusType,
    title: string,
    description: string,
}

export type AlertContextType = {
    alerts: AlertType[],
    addAlert: (status: StatusType, title: string, description: string) => void
    removeAlert: (id: number) => void,
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined)