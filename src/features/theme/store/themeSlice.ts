import { createSlice } from "@reduxjs/toolkit";
import type { ThemeState } from "@/shared/types";

const saved = localStorage.getItem("ms-theme") as "dark" | "light" | null;
const initialState: ThemeState = { mode: saved || "dark" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("ms-theme", state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
