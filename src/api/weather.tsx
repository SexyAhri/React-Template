import axiosInstance from "../utils/axiosInstance";

export const getWeather = async () => {
  const response = await axiosInstance.get(
    "https://api.oioweb.cn/api/weather/GetWeather"
  );
  return response;
};
