import { PaginationRequest } from "./Rest";

export interface Ticket {
    client?: string;
    concessionerCode?: string;
    catalog?: string;
    occurrenceDate?: string;
    deliveryDate?: string;
    preAlertDate?: string;
    contact?: string;
    email?: string;
    phone?: string;
    concessionerId?: number;
    typeVehicleId?: number;
    serie?: string;
    numberDua?: string;
    numberRemesa?: string;
    driverName?: string;
    plate?: string;
    alertDate?: string;
    responseDate?: string;
    requestDate?: string;
    inVoice?: string;
    inVoiceNumber?: string;
    inVoiceAmount?: number;
    ticketAmount?: number;
    firstPayment?: number;
}

export interface Piece {
    count: number;
    replace: boolean;
    amount: number;
    typePieceName: string;
    typeDamageName: string;
    sizeDamageName: string;
    attributableName: string;
    stateIdName: string;
    typologyName: string;
}

export interface File {
    nodeId: string;
    originalName: string;
    size: number;
    extension: string;
    created: string;
    createdBy: string;
}

export interface Criteria extends PaginationRequest {
    SequenceId?: string;
    OccurrenceDate?: string;
    ConcessionerId?: number;
    TypeVehicleId?: number;
    Plate?: string;
    NumberDua?: string;
    Serie?: string;
    DriverName?: string;
}

export interface TicketResult {
    ticketId: string;
    sequenceId: string;
    client: string;
    occurrenceDate: string;
    concessionerName: string;
    typeVehicleName: string;
    serie: string;
    plate: string;
}