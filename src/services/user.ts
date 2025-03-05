import axios from "axios";
import { UserResponse } from "../types/Rest";

const current = async (accessToken: string): Promise<UserResponse> => {
    try {
        const response = await axios.get<UserResponse>(
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/user/current',
            `${import.meta.env.VITE_API_URL}/user/current`,
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

export { current };