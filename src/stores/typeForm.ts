import { create } from 'zustand';

type TypesFormValues = 'reg' | 'login';

interface TypesFormInterface {
    typeForm: TypesFormValues;
    changeTypeForm: (status: TypesFormValues) => void;
}

const useTypeFormStore = create<TypesFormInterface>((set) => ({
    typeForm: 'reg',
    changeTypeForm: (newStatus) => set({ typeForm: newStatus }),
}));

export { useTypeFormStore };
