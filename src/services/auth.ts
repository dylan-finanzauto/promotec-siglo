import axios from 'axios';
import { LoginRequest, LoginResponse, RefreshRequest, RefreshResponse } from '../types/Rest';

const login = async (body: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(
            `${import.meta.env.VITE_API_URL}/authentication/login`,
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/authentication/login',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
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

const refresh = async (body: RefreshRequest): Promise<RefreshResponse> => {
    try {
        const response = await axios.post<RefreshResponse>(
            `${import.meta.env.VITE_API_URL}/authentication/refresh`,
            // 'http://192.168.40.106/Promotec.Siglo.Api/api/authentication/refresh',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        return response.data;
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out');
        }
        throw error;
    }
};

export { login, refresh };