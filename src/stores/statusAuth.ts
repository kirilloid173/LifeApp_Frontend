import { create } from 'zustand';

type AuthStatus = 'unknown' | 'isAuth' | 'notIsAuth' | 'errorConnection';

interface StoreStatusAuth {
    statusAuth: AuthStatus;
    changeStatus: (status: AuthStatus) => void;
}

const statusAuthStore = create<StoreStatusAuth>((set) => ({
    statusAuth: 'unknown',
    changeStatus: (status) => set({ statusAuth: status }),
}));

export default statusAuthStore;
