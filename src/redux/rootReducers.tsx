import { combineReducers } from '@reduxjs/toolkit';
import layoutReducer, {
  LayoutState,
} from '@/modules/layout/reducers/LayoutReducer';
import weatherReducer, {
  WeatherState,
} from '@/modules/weather/reducers/weatherReducer';

export interface RootState {
  layout: LayoutState;
  weather: WeatherState;
}

const rootReducer = combineReducers({
  layout: layoutReducer,
  weather: weatherReducer,
});

export default rootReducer;
