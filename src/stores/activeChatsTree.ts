import { create } from 'zustand';

interface ChatTreeValue {
    message: string;
    login: string;
    date_time: string;
}

interface ActiveChatsTree {
    tree: Array<ChatTreeValue>;
    changeTree: (changeTree: Array<ChatTreeValue>) => void;
}

const useActiveChatsTreeStore = create<ActiveChatsTree>((set) => ({
    tree: [],
    changeTree: (changeTree) =>{ console.log(changeTree); set({ tree: changeTree })},
}));

export { useActiveChatsTreeStore };
