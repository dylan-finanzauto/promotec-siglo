import React, { useEffect, useState } from "react"
import { AuthToken, Role, Token } from "../types/Auth";
import { AuthContext } from "../context/AuthContext";
import { refresh } from "../services/auth";

const initialState = {
    accessToken: "",
    refreshToken: "",
    expirationDate: "",
    expiresIn: 0,
    role: "SGL-Promotec",
    isAuthenticated: false,
    expired: false,
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
            // role: "SGL-Tecnologia",
            isAuthenticated: true,
            expired: false,
        })
        setTimeout(async () => {
            console.log("Current token: ", token)
            try {
                const tokenRefreshed = await refresh({ accessToken: token.accessToken, refreshToken: token.refreshToken })
                onLogin({
                    ...tokenRefreshed,
                    role: tokenRefreshed.roles.find(r => r.descripcion.startsWith('SGL'))?.descripcion as Role || 'SGL-Promotec'
                })
                console.log("Token refreshed: ", tokenRefreshed);
            } catch (e) {
                expireSession()
            }
        }, (token.expiresIn - 5) * 60 * 1000)
    }

    const expireSession = () => {
        localStorage.removeItem('token')
        setToken({
            ...initialState,
            expired: true
        })
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
