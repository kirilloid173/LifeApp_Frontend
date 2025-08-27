import { create } from 'zustand';

type AuthStatus = 'unknown' | 'isAuth' | 'notIsAuth' | 'errorConnection';

interface StoreStatusAuth {
    statusAuth: AuthStatus;
    changeStatusAuth: (status: AuthStatus) => void;
}

const useStatusAuthStore = create<StoreStatusAuth>((set) => ({
    statusAuth: 'unknown',
    changeStatusAuth: (status) => set({ statusAuth: status }),
}));

export { useStatusAuthStore };
