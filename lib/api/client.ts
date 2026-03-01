import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../stores/auth.store';

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
client.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
client.interceptors.response.use(
    (response) => {
        // Attempt to unwrap data from typical API response wrapper e.g. { success: true, data: {...} }
        if (response.data && response.data.data !== undefined) {
            return response.data.data;
        }
        return response.data;
    },
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
        }

        // Extract error message for 400/422 or fallback
        let errorMessage = "An unexpected error occurred.";
        if (error.response?.data) {
            const data: any = error.response.data;
            if (typeof data.message === 'string') {
                errorMessage = data.message;
            } else if (Array.isArray(data.message)) {
                errorMessage = data.message.join(', ');
            }
        }

        return Promise.reject(new Error(errorMessage));
    }
);

export default client;
