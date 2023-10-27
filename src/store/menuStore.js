import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMenuStore = create((set, get) => ({
  selectedMenu: {},
  setSelectedMenu: (menu) => set({ selectedMenu: menu }),
}));

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      setAddToCart: (order) => {
        set((state) => ({ cart: [...state.cart, order] }));
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart",
    }
  )
);
