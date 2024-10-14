// layoutActions.ts
import { createAction } from "@reduxjs/toolkit";

// 定义 actions
export const toggleTheme = createAction<void>("layout/toggleTheme");
export const toggleCollapse = createAction<void>("layout/toggleCollapse");
