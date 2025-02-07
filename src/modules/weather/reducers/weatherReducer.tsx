import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  WeatherActionTypes,
} from '../actions/weatherActions';
import { WeatherData } from '../actions/weatherActions';

// 定义初始状态的类型
export interface WeatherState {
  loading: boolean;
  weather: WeatherData | null; // WeatherData 类型或 null
  error: string | null; // 错误信息或 null
}

// 初始状态
const initialState: WeatherState = {
  loading: false,
  weather: null,
  error: null,
};

// weatherReducer 定义
const weatherReducer = (
  state = initialState,
  action: WeatherActionTypes,
): WeatherState => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_WEATHER_SUCCESS:
      return { ...state, loading: false, weather: action.payload, error: null };
    case FETCH_WEATHER_FAILURE:
      return { ...state, loading: false, error: action.payload, weather: null };
    default:
      return state;
  }
};

export default weatherReducer;
