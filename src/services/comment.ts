import axios from "axios";
import { CommentRequest } from "../types/Rest";

const create = async (accessToken: string, id: string, data: CommentRequest): Promise<any> => {
    try {
        const response = await axios.post<any>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/comment/create/${id}`,
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

export { create }