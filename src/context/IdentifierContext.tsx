import { createContext } from "react";

export type IdentifierContextType = {
    id: null | string,
    changeId: (id: null | string) => void
}

export const IdentifierContext = createContext<IdentifierContextType>({
    id: null,
    changeId: () => { }
})