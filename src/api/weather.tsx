import axiosInstance from '@/utils/axiosInstance';
import { WeatherResponse } from './types/weatherTypes'; // 导入接口类型

// 获取天气数据
export const getWeather = async (): Promise<WeatherResponse> => {
  try {
    const response = await axiosInstance.get<WeatherResponse>(
      'https://api.oioweb.cn/api/weather/GetWeather',
    );
    return response.data; // 返回响应体中的数据
  } catch (error) {
    console.error('获取天气数据失败:', error);
    throw error; // 或者你可以根据需求进行更复杂的错误处理
  }
};
