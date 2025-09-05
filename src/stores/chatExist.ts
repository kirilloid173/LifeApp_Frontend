import { create } from 'zustand';

interface ChatExist {
    exist: boolean;
    changeStatus: (newStatus: boolean) => void;
}

const useChatExistStore = create<ChatExist>((set) => ({
    exist: false,
    changeStatus: (newStatus) => set({ exist: newStatus }),
}));

export { useChatExistStore };
