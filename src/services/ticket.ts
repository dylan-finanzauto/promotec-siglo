import axios from "axios";
import { Piece, Ticket, File, TicketResult } from "../types/Ticket";
import { Piece as AddPiece, CompleteResponse, PaginatedResponse, PostTicket, PostTicketComplete } from "../types/Rest";

const detail = async (accessToken: string, id: string): Promise<Ticket> => {
    try {
        const response = await axios.get<Ticket>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/ticket/detail/${id}`,
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

const create = async (accessToken: string, data: PostTicket): Promise<string> => {
    try {
        const response = await axios.post<string>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/ticket/create`,
            data,
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

const update = async (accessToken: string, id: string, data: Ticket): Promise<any> => {
    try {
        const response = await axios.put<any>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/ticket/update/${id}`,
            data,
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

const addPieces = async (accessToken: string, id: string, data: AddPiece[]): Promise<any> => {
    try {
        const response = await axios.post<any>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/ticket/add-pieces/${id}`,
            data,
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



const addFiles = async (accessToken: string, id: number): Promise<any> => {
    try {
        const response = await axios.get<string>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/ticket/add-files/${id}`,
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

const pieces = async (accessToken: string, id: string): Promise<any[]> => {
    try {
        const response = await axios.get<any>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/ticket/piece/${id}`,
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

const files = async (accessToken: string, id: string): Promise<File[]> => {
    try {
        const response = await axios.get<File[]>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/ticket/file/${id}`,
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

const downloadFile = async (accessToken: string, id: string): Promise<any> => {
    try {
        const response = await axios.get<any>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/ticket/dowwload-file/${id}`,
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

const complete = async (accessToken: string, id: string, data: PostTicketComplete): Promise<CompleteResponse> => {
    try {
        const response = await axios.post<CompleteResponse>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/ticket/complete/${id}`,
            data,
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

const pagination = async (accessToken: string, data: Record<any, any>): Promise<PaginatedResponse<TicketResult>> => {
    try {
        const searchParams = new URLSearchParams(data)
        const response = await axios.get<PaginatedResponse<TicketResult>>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/ticket/pagination?${searchParams.toString()}`,
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

const downloadB64 = async (accessToken: string, id: string): Promise<any> => {
    try {
        const response = await axios.get<any>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/ticket/download-base64/${id}`,
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

export { detail, create, complete, update, pieces, addPieces, files, addFiles, downloadFile, pagination, downloadB64 }