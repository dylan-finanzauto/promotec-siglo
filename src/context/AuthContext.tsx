import { createContext } from "react";
import { AuthToken, Token } from "../types/Auth";

export type AuthContextType = {
    token: AuthToken,
    onLogin: (token: Token) => void,
    onLogOut: () => void
}

export const AuthContext = createContext<AuthContextType>({
    token: {
        accessToken: "",
        refreshToken: "",
        expirationDate: "",
        expiresIn: 0,
        isAuthenticated: false,
        role: "SGL-Tecnologia"
    },
    onLogin: () => { },
    onLogOut: () => { }
})
