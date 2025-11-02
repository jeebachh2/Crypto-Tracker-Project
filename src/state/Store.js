import { create } from "zustand";

// ✅ This defines and exports a named store
export const currencyStore = create((set) => ({
  currency: "usd",
  setCurrency: (newCurrency) => set({ currency: newCurrency }),
}));
