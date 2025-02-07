import axios from "axios";

// 使用环境变量设置基础URL
const baseURL = import.meta.env.VITE_API_BASE_URL  || "https://jsonplaceholder.typicode.com/";

const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 添加JWT认证
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 可以在这里添加请求前的统一处理逻辑，比如显示加载提示等

    // 考虑超时提示逻辑，但实际实现可能需要结合具体UI框架
    // 这里仅做注释说明
    // if (config.timeout && config.timeout !== Infinity) {
    //   console.log('请求将在', config.timeout, '毫秒后超时');
    // }

    return config;
  },
  (error) => {
    // 处理请求错误，比如网络不通时的错误提示
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 数据返回前的处理，这里直接返回data
    return response.data;
  },
  (error) => {
    // 根据错误状态码进行不同的错误处理
    const { status } = error.response || {};
    if (status === 400) {
      // 错误提示逻辑，比如弹窗展示错误信息
      console.error("客户端请求错误");
    } else if (status === 401) {
      // 处理未授权的情况，比如跳转登录页面
      console.error("未授权，请重新登录");
    } else if (status === 404) {
      console.error("请求的资源不存在");
    } else if (status >= 500) {
      // 服务端错误
      console.error("服务器错误");
    } else if (!status) {
      // 网络问题
      console.error("网络连接问题，请检查网络");
    }
    return Promise.reject(error); // 返回reject以便在调用处处理错误
  }
);

export default instance;
