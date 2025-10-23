import { create } from 'zustand';

interface TextErrorForm {
    textError: string;
    changeTextError: (textError: string) => void;
}

const useTextErrorFormStore = create<TextErrorForm>((set) => ({
    textError: '',
    changeTextError: (newTextError) => set({ textError: newTextError }),
}));

export { useTextErrorFormStore };
