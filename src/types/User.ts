export interface User {
    name: string;
    lastName: string;
    email: string;
    lastConnecction: string;
    roles: Role[];
}

interface Role {
    descripcion: string;
}