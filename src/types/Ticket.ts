export interface Ticket {
    client?: string;
    concessionerCode?: string;
    catalog?: string;
    ocurrencyDate?: string;
    deliveryDate?: string;
    preAlertDate?: string;
    contact?: string;
    email?: string;
    telefono?: string;
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
    invoice?: string;
    invoiceNumber?: string;
    invoiceAmount?: number;
    ticketAmount?: number;
    firstPayment?: number;
    emailId?: number;
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
