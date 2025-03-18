import axios from "axios";
import { RoleResponse } from "../types/Rest";

const all = async (accessToken: string): Promise<RoleResponse[]> => {
    try {
        const response = await axios.get<RoleResponse[]>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/master/attributable',
            `${import.meta.env.VITE_API_URL}/role`,
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

export { all }