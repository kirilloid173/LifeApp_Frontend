import { create } from 'zustand';

type PopupStatus =
    | 'cannotConnectBackend'
    | 'UserIsExist'
    | 'successReg'
    | 'turnOff'; // turnOff = Not show popup

interface StoreStatusAuth {
    statusPopup: PopupStatus;
    changeStatusPopup: (status: PopupStatus) => void;
}

const usePopupRegStore = create<StoreStatusAuth>((set) => ({
    statusPopup: 'turnOff',
    changeStatusPopup: (newStatus) => set({ statusPopup: newStatus }),
}));

export { usePopupRegStore };
