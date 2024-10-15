import { createAction } from "@reduxjs/toolkit";

export const toggleTheme = createAction<void>("layout/toggleTheme");
export const toggleCollapse = createAction<void>("layout/toggleCollapse");
