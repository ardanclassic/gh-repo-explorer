import { create } from "zustand";

export const themeStore = create((set) => ({
  theme: "white",
  changeTheme: (newtheme: string) => set((state: any) => ({ theme: newtheme })),
}));
