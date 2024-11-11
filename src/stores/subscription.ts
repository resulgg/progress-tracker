import { create } from "zustand";

interface ProDialogStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProDialog = create<ProDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
