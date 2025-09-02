import { create } from 'zustand';

interface ChoosenChat {
    choosen: boolean;
    changeStatus: (newStatus: boolean) => void;
}

const useChoosenChatStore = create<ChoosenChat>((set) => ({
    choosen: false,
    changeStatus: (newStatus) => set({ choosen: newStatus }),
}));

export { useChoosenChatStore };
