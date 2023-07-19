import { create } from "zustand";

export const themeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "light",
  changeTheme: (newtheme: string) => set((state: any) => ({ theme: newtheme })),
}));
