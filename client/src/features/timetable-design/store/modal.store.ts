import { create } from 'zustand';

export type ModalType =
  | 'institution'
  | 'program'
  | 'academic-year'
  | 'section'
  | 'catalog'
  | 'faculties'
  | 'subjects'
  | 'rooms'
  | 'template';

export type ModalData = {
  id?: string;
  type?: ModalType;
};

type ModalStore = {
  isOpen: boolean;
  type: ModalType | null;
  data: ModalData | null;

  open: (type: ModalType, data?: ModalData) => void;

  close: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  type: null,
  data: null,

  open: (type, data = {}) =>
    set({
      isOpen: true,
      type,
      data,
    }),

  close: () =>
    set({
      isOpen: false,
      type: null,
      data: null,
    }),
}));
