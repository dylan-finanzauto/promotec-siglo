import type { Token } from "./Auth";
import type { User } from "./User";

export interface BasicResponse<T> {
    value: T;
    isSuccess: boolean;
    isFailure: boolean;
    error: Error;
}

interface Error {
    code: null;
    description: string;
    type: number;
}

export interface LoginRequest {
    username: string;
    password: string;
}

interface Role {
    descripcion: string;
}

export interface LoginResponse extends Token {
    roles: Role[];
}

export interface UserResponse extends User { }

export interface RefreshRequest {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshResponse extends Token {
    roles: Role[]
}

export interface Piece {
    typeDamageId: number;
    typePieceId: number;
    sizeDamageId: number;
    count: number;
    replace: boolean;
    amount: number;
    attributableId: number;
    stateId: number;
    typologyId: number;
}

export interface CommentRequest {
    emails: string[];
    comment: string;
    files: File[];
}

export interface File {
    FileBase64: string;
    fileName: string;
}

export interface PostTicket {

}