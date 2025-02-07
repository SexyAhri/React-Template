import axiosInstance from "../utils/axiosInstance";
export const getUser = async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

export const updateUser = async (data: any) => {
  const response = await axiosInstance.put("/user", data);
  return response.data;
};
