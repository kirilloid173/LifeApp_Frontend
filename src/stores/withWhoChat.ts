import { create } from 'zustand';

interface WithWhoChat {
    withWhoChat: string;
    changeWithWhoChat: (whoLogin: string) => void;
}

const useWithWhoChatStore = create<WithWhoChat>((set) => ({
    withWhoChat: '',
    changeWithWhoChat: (whoLogin) => set({ withWhoChat: whoLogin }),
}));

export { useWithWhoChatStore };
