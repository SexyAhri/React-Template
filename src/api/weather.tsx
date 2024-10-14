import axiosInstance from "../utils/axiosInstance";
import { WeatherResponse } from "./types/weatherTypes"; // 导入接口类型

// 获取天气数据
export const getWeather = async (): Promise<WeatherResponse> => {
  const response = await axiosInstance.get<WeatherResponse>(
    "https://api.oioweb.cn/api/weather/GetWeather"
  );
  return response;
};
