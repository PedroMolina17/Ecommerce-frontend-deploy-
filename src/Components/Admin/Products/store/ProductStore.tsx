import { create } from "zustand";

interface IProductStore {
  operation:
    | "ViewProduct"
    | "Edit"
    | "Delete"
    | "Create"
    | "UpdateProduct"
    | "CreateProduct";
  productId: number | null;
  setOperation: (
    operation:
      | "ViewProduct"
      | "Edit"
      | "Delete"
      | "Create"
      | "UpdateProduct"
      | "CreateProduct"
  ) => void;
  setProductId: (productId: number) => void;
}

const useProductStore = create<IProductStore>((set) => ({
  operation: "ViewProduct",
  productId: null,
  setOperation: (operation) => set({ operation }),
  setProductId: (productId) => set({ productId }),
}));

export default useProductStore;
