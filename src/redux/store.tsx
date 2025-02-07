// store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducers';

// 创建 store
export const store: any = configureStore({
  reducer: rootReducer,
});

// 定义 store 的类型
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
