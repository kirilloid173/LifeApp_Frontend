import { create } from 'zustand';

interface defaultValueObject {
    defaultValue?: 'notFound' | 'found' | 'searchEmpty';
    login?: string;
}

type objectType = defaultValueObject;

interface SearchPopup {
    resultUsers: Array<objectType>;
    changeResultUsers: (newList: Array<objectType>) => void;
}

const useSearchPopupStore = create<SearchPopup>((set) => ({
    resultUsers: [{ defaultValue: 'searchEmpty' }],
    changeResultUsers: (newList) => set({ resultUsers: newList }),
}));

export { useSearchPopupStore };
