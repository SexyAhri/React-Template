import { getWeather } from "../../../api/index";
export const FETCH_WEATHER_REQUEST = "FETCH_WEATHER_REQUEST";
export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS";
export const FETCH_WEATHER_FAILURE = "FETCH_WEATHER_FAILURE";

export const fetchWeatherRequest = () => ({
  type: FETCH_WEATHER_REQUEST,
});

export const fetchWeatherSuccess = (weather: any) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: weather,
});

export const fetchWeatherFailure = (error: any) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
});

export const fetchWeather = () => async (dispatch: any) => {
  try {
    dispatch(fetchWeatherRequest());
    const response:any = await getWeather();
    const { City } = response.result.city;
    const { day_weather, day_weather_short } = response.result.condition;
    const res = [City, day_weather, day_weather_short];
    dispatch(fetchWeatherSuccess(res));
  } catch (error: any) {
    dispatch(fetchWeatherFailure(error.message));
  }
};
