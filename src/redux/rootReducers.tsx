import { combineReducers } from "@reduxjs/toolkit";
import layoutReducer from "@/modules/layout/reducers/layoutReducer";
import weatherReducer from "@/modules/weather/reducers/weatherReducer";

export interface RootState {
  layout: ReturnType<typeof layoutReducer>;
  weather: ReturnType<typeof weatherReducer>;
}

const rootReducer = combineReducers({
  layout: layoutReducer,
  weather: weatherReducer,
});

export default rootReducer;
