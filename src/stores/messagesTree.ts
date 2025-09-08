import { create } from 'zustand';

interface interfaceMessages {
    message: string;
    authorMessage: boolean;
}

interface MessagesTree {
    tree: Array<interfaceMessages>;
    insertData: (data: Array<interfaceMessages>) => void;
}

const useMessagesTreeStore = create<MessagesTree>((set) => ({
    tree: [],
    insertData: (data) => set({ tree: data }),
}));

export { useMessagesTreeStore };
