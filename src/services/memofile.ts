import axios from "axios";
import { PaginatedResponse } from "../types/Rest";
import { Memo } from "../types/Memo";

const pagination = async (accessToken: string, data: Record<any, any>): Promise<PaginatedResponse<Memo>> => {
    try {
        const searchParams = new URLSearchParams(data)
        const response = await axios.get<PaginatedResponse<Memo>>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/memo-file/pagination?${searchParams.toString()}`,
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

const updateMemo = async (accessToken: string, data: Record<any, any>): Promise<any> => {
    try {
        const searchParams = new URLSearchParams(data)
        const response = await axios.put<any>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/memo-file?${searchParams.toString()}`,
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

const deleteMemo = async (accessToken: string, data: Record<any, any>): Promise<any> => {
    try {
        const searchParams = new URLSearchParams(data)
        const response = await axios.delete<any>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/memo-file?${searchParams.toString()}`,
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

export { pagination, updateMemo, deleteMemo }