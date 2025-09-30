import { create } from 'zustand';

interface MobileMenu {
    status: boolean;
    changeStatus: (newStatus: boolean) => void;
}

const useStatusMobileMenuStore = create<MobileMenu>((set) => ({
    status: false,
    changeStatus: (newStatus) => set({ status: newStatus }),
}));

export { useStatusMobileMenuStore };
