import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
    sub: string;
    tenantId: string;
    role: 'ADMIN' | 'DOCTOR' | 'RECEPTIONIST';
    email: string;
    name: string;
    exp: number;
}

export interface AuthState {
    token: string | null;
    user: { sub: string; tenantId: string; role: string; email: string; name: string } | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

function setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; secure; samesite=strict";
}

function eraseCookie(name: string) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            login: (token: string) => {
                try {
                    const decoded = jwtDecode<DecodedToken>(token);
                    setCookie('auth_token', token, 7); // Set cookie for SSR middleware
                    set({
                        token,
                        user: {
                            sub: decoded.sub,
                            tenantId: decoded.tenantId,
                            role: decoded.role,
                            email: decoded.email,
                            name: decoded.name,
                        },
                        isAuthenticated: true,
                    });
                } catch (error) {
                    console.error("Invalid token", error);
                }
            },
            logout: () => {
                eraseCookie('auth_token');
                set({ token: null, user: null, isAuthenticated: false });
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
