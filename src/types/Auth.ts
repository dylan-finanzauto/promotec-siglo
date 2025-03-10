export type Role = "SGL-Promotec" | "SGL-Concesionario" | "SGL-Tecnologia";

export interface Token {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    expirationDate: string;
    role: Role
}

export interface AuthToken extends Token {
    isAuthenticated: boolean;
    expired: boolean;
}