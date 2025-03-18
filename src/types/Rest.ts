import type { Token } from "./Auth";
import type { User } from "./User";

export interface BasicResponse<T> {
    value: T;
    isSuccess: boolean;
    isFailure: boolean;
    error: Error;
}

export interface PaginationRequest {
    PageNumber: number;
    PageSize: number;
}

export interface PaginationResponse {
    page: number;
    pageSize: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> extends PaginationResponse {
    items: T[];
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
    client: string;
    concessionerCode: string;
    catalog: string;
    ocurrencyDate: string;
    deliveryDate: string;
    preAlertDate: string;
    contact: string;
    email: string;
    phone: string;
    concessionerId: number;
    typeVehicleId: number;
    serie: string;
    numberDua: string;
    numberRemesa: string;
    driverName: string;
    plate: string;
    pieces: Piece[];
}

export interface PostTicketComplete {
    alertDate: string;
    responseDate: string;
    requestDate: string;
    invoice: string;
    invoiceNumber: string;
    invoiceAmount: number;
    ticketAmount: number;
    firstPayment: number;
    emailId: number;
    comments: Comment[];
}

export interface Comment {
    emails: string[];
    comment: string;
    files: File[];
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

export interface CompleteResponse {
    sequenceId: string;
    concessionerId: number;
    serie: string;
    observation: string;
}

export interface CommentResponse {
    observation: string;
    files: any[];
    userName: string;
    created: string;
}

export interface RoleResponse {
    roleId: string;
    normalizedName: string;
}