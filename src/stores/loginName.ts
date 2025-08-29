import { create } from 'zustand';

interface LoginName {
    loginName: string;
    changeLoginName: (loginName: string) => void;
}

const useLoginNameStore = create<LoginName>((set) => ({
    loginName: '',
    changeLoginName: (loginName) => set({ loginName: loginName }),
}));

export { useLoginNameStore };
