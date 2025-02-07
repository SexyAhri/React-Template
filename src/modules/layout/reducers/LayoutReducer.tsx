import { createReducer } from '@reduxjs/toolkit';
import { toggleTheme, toggleCollapse } from '../actions/LayoutActions';

export interface LayoutState {
  isDarkTheme: boolean;
  collapsed: boolean;
}

const initialState: LayoutState = {
  isDarkTheme: localStorage.getItem('isDarkTheme') === 'true',
  collapsed: localStorage.getItem('collapsed') === 'true',
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
