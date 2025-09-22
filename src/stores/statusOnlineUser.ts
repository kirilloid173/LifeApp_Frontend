import { create } from 'zustand';

interface StatusOnline {
    status: boolean;
    changeStatus: (newStatus: boolean) => void;
}

const useStatusOnlineUserStore = create<StatusOnline>((set) => ({
    status: false,
    changeStatus: (newStatus) => set({ status: newStatus }),
}));

export { useStatusOnlineUserStore };
