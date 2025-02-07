import { getWeather } from '@/api/index';
import { Dispatch } from 'redux';

// 定义 Action 类型常量
export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

// 定义接口来描述每个 Action
interface FetchWeatherRequestAction {
  type: typeof FETCH_WEATHER_REQUEST;
}

interface FetchWeatherSuccessAction {
  type: typeof FETCH_WEATHER_SUCCESS;
  payload: WeatherData; // 成功的响应
}

interface FetchWeatherFailureAction {
  type: typeof FETCH_WEATHER_FAILURE;
  payload: string; // 错误信息
}

export interface WeatherData {
  city: string;
  dayWeather: string;
  dayWeatherShort: string;
}

export const fetchWeatherRequest = (): FetchWeatherRequestAction => ({
  type: FETCH_WEATHER_REQUEST,
});

export const fetchWeatherSuccess = (
  weather: WeatherData,
): FetchWeatherSuccessAction => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: weather,
});

export const fetchWeatherFailure = (
  error: string,
): FetchWeatherFailureAction => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
});

export const fetchWeather =
  () => async (dispatch: Dispatch<WeatherActionTypes>) => {
    try {
      dispatch(fetchWeatherRequest());
      const response = await getWeather();
      const { City } = response.result.city;
      const { day_weather, day_weather_short } = response.result.condition;

      const weatherData: WeatherData = {
        city: City,
        dayWeather: day_weather,
        dayWeatherShort: day_weather_short,
      };

      dispatch(fetchWeatherSuccess(weatherData));
    } catch (error: any) {
      dispatch(
        fetchWeatherFailure(error.message || 'Failed to fetch weather data'),
      );
    }
  };

// 定义联合类型用于 Reducer
export type WeatherActionTypes =
  | FetchWeatherRequestAction
  | FetchWeatherSuccessAction
  | FetchWeatherFailureAction;
