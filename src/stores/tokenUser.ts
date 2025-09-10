import { create } from 'zustand';

interface TokenUser {
    token: string;
    changeTokenUser: (newToken: string) => void;
}

const useTokenUserStore = create<TokenUser>((set) => ({
    token: '',
    changeTokenUser: (newToken) => set({ token: newToken }),
}));

export { useTokenUserStore };
