import { create } from 'zustand';

interface SocketChannel {
    status: boolean;
    changeStatus: (newStatus: boolean) => void;
}

const useSocketChannelStore = create<SocketChannel>((set) => ({
    status: false,
    changeStatus: (newStatus) => set({ status: newStatus }),
}));

export { useSocketChannelStore };
