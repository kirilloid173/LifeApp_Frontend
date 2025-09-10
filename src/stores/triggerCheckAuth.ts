import { create } from 'zustand';

interface TriggerCheckAuth {
    value: number;
    changeValue: (newValue: number) => void;
}

const useTriggerCheckAuthStore = create<TriggerCheckAuth>((set) => ({
    value: 0,
    changeValue: (newValue) => set({ value: newValue }),
}));

export { useTriggerCheckAuthStore };
