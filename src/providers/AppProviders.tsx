import type React from "react"
import AuthProvider from "./AuthProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { ToastProvider } from "./ToastProvider"
// import ToastContainer from "../components/ui/ToastContainer"
import { AlertProvider } from "./AlertProvider"
import AlertContainer from "../components/ui/AlertContainer"

const queryClient = new QueryClient()

type Props = {
    children: React.ReactNode
}

const AppProviders: React.FC<Props> = ({ children }) => {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <AlertProvider>
                    {children}
                    <AlertContainer />
                </AlertProvider>
            </QueryClientProvider>
        </AuthProvider>
    )
}

export default AppProviders;