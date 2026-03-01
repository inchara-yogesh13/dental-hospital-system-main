import client from './client';

export const authApi = {
    login: async (credentials: { email: string; password: string }) => {
        return client.post<{ token: string }>('/auth/login', credentials);
    },
};
