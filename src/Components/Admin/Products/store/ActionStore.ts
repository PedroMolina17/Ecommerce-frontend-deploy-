import { create } from "zustand";

// Define la interfaz IOpenForm con tipos literales específicos para las claves
interface IOpenForm {
  openForm: {
    edit: boolean;
    delete: boolean;
    create: boolean;
  };
  setOpenForm: (nameForm: keyof IOpenForm["openForm"]) => void;
}

export const useOpenFormStoreProduct = create<IOpenForm>((set) => ({
  openForm: {
    edit: false,
    delete: false,
    create: false,
  },
  setOpenForm: (nameForm) =>
    set((state) => ({
      ...state,
      openForm: {
        ...state.openForm,
        [nameForm]: !state.openForm[nameForm],
      },
    })),
}));
