import { createReducer } from "@reduxjs/toolkit";
import { toggleTheme, toggleCollapse } from "../actions/layoutActions";

interface LayoutState {
  isDarkTheme: boolean;
  collapsed: boolean;
}

const initialState: LayoutState = {
  isDarkTheme: false,
  collapsed: false,
};

const layoutReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleTheme, (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    })
    .addCase(toggleCollapse, (state) => {
      state.collapsed = !state.collapsed;
    });
});

export default layoutReducer;
