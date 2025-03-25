export interface User {
    name: string;
    lastName: string;
    email: string;
    userName: string,
    lastConnecction: string;
    roles: Role[];
}

interface Role {
    descripcion: string;
}