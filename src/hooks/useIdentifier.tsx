import { useContext } from "react";
import { IdentifierContext } from "../context/IdentifierContext";

export function useIdentifier() {
    const context = useContext(IdentifierContext);
    if (!context) {
        throw new Error("useIdentifier debe estar dentro de un ToastProvider");
    }
    return context;
}
