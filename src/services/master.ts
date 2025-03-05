import axios from "axios";
import { Master } from "../types/Master";

const attributable = async (accessToken: string): Promise<Master[]> => {
    try {
        const response = await axios.get<Master[]>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/master/attributable`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out');
        }
        throw error;
    }
};

const company = async (accessToken: string): Promise<Master[]> => {
    try {
        const response = await axios.get<Master[]>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/company',
            `${import.meta.env.VITE_API_URL}/master/company`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out');
        }
        throw error;
    }
};

const concessioner = async (accessToken: string): Promise<Master[]> => {
    try {
        const response = await axios.get<Master[]>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/concessioner',
            `${import.meta.env.VITE_API_URL}/master/concessioner`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out');
        }
        throw error;
    }
};

const email = async (accessToken: string): Promise<Master[]> => {
    try {
        const response = await axios.get<Master[]>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/email',
            `${import.meta.env.VITE_API_URL}/master/email`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out');
        }
        throw error;
    }
};

const sizeDamage = async (accessToken: string): Promise<Master[]> => {
    try {
        const response = await axios.get<Master[]>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/size-damage',
            `${import.meta.env.VITE_API_URL}/master/size-damage`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out');
        }
        throw error;
    }
};

const state = async (accessToken: string): Promise<Master[]> => {
    try {
        const response = await axios.get<Master[]>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/state',
            `${import.meta.env.VITE_API_URL}/master/state`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out');
        }
        throw error;
    }
};

const typeDamage = async (accessToken: string): Promise<Master[]> => {
    try {
        const response = await axios.get<Master[]>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/type-damage',
            `${import.meta.env.VITE_API_URL}/master/type-damage`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out');
        }
        throw error;
    }
};

const typePiece = async (accessToken: string): Promise<Master[]> => {
    try {
        const response = await axios.get<Master[]>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/type-piece',
            `${import.meta.env.VITE_API_URL}/master/type-piece`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out');
        }
        throw error;
    }
};

const typeVehicle = async (accessToken: string): Promise<Master[]> => {
    try {
        const response = await axios.get<Master[]>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/type-vehicle',
            `${import.meta.env.VITE_API_URL}/master/type-vehicle`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out');
        }
        throw error;
    }
};

const typology = async (accessToken: string): Promise<Master[]> => {
    try {
        const response = await axios.get<Master[]>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/typology',
            `${import.meta.env.VITE_API_URL}/master/typology`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out');
        }
        throw error;
    }
};

export { attributable, company, concessioner, email, sizeDamage, state, typeDamage, typePiece, typeVehicle, typology };