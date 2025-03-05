import React, { useEffect, useState } from "react"
import { AuthToken, Token } from "../types/Auth";
import { AuthContext } from "../context/AuthContext";
import { refresh } from "../services/auth";

const initialState = {
    accessToken: "",
    refreshToken: "",
    expirationDate: "",
    expiresIn: 0,
    role: "SGL-Promotec",
    isAuthenticated: false
} as AuthToken

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [token, setToken] = useState<AuthToken>(initialState);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            loadToken(JSON.parse(token))
        }
    }, [])

    const loadToken = async (token: Token) => {
        onLogin(token)
    }

    const onLogin = (token: Token) => {
        localStorage.setItem('token', JSON.stringify(token))
        setToken({
            ...token,
            role: "SGL-Tecnologia",
            isAuthenticated: true
        })
        setTimeout(async () => {
            const tokenRefreshed = await refresh({ accessToken: token.accessToken, refreshToken: token.refreshToken })
            onLogin(tokenRefreshed)
            console.log("Token refreshed");
        }, (token.expiresIn - 15) * 60 * 1000)
    }

    const onLogOut = () => {
        localStorage.removeItem('token')
        setToken(initialState)
    }

    return (
        <AuthContext.Provider value={{ token, onLogin, onLogOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
