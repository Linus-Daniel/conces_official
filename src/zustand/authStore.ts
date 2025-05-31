import { create } from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    user: { id: string; name: string } | null;
    token: string | null;
    login: (user: { id: string; name: string }, token: string) => void;
    logout: () => void;
    register: (user: { id: string; name: string }, token: string) => void;
    simulateAuthCheck: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    token: null,
    login: (user, token) =>
        set({
            isAuthenticated: true,
            user,
            token,
        }),
    logout: () =>
        set({
            isAuthenticated: false,
            user: null,
            token: null,
        }),
    register: (user, token) =>
        set({
            isAuthenticated: true,
            user,
            token,
        }),
    simulateAuthCheck: () => {
        // Simulate real-time auth check with polling
        setInterval(() => {
            const token = localStorage.getItem('authToken');
            if (token) {
                set({
                    isAuthenticated: true,
                    user: { id: '1', name: 'John Doe' }, // Replace with actual user data
                    token,
                });
            } else {
                set({
                    isAuthenticated: false,
                    user: null,
                    token: null,
                });
            }
        }, 5000); // Poll every 5 seconds
    },
}));

export default useAuthStore;