import React, { useState } from "react";
import { IdentifierContext } from "../context/IdentifierContext";

type Props = {
    children: React.ReactNode
}

const IdentifierProvider: React.FC<Props> = ({ children }) => {

    const [id, setId] = useState<string | null>(null);

    const changeId = (id: string | null) => {
        setId(id)
    }

    return (
        <IdentifierContext.Provider value={{ id, changeId }}>
            {children}
        </IdentifierContext.Provider>
    )
}

export default IdentifierProvider;