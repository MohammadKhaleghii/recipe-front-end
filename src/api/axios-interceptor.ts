import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.edamam.com",
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.params = {
      ...config.params,
      app_id: "d29e7d29",
      app_key: "a5d799d39df62345f05f8d36489e5953",
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
