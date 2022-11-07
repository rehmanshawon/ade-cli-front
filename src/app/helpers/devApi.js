import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authInfo =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
    if (authInfo) {
      config.headers.Authorization = `Bearer ${authInfo.access_token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response;
    }
    return Promise.reject(response.data);
  },
  (error) => {
    const expErr =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expErr) {
      console.log("Unexpected error : ", error.response);
    }

    if (error.response) {
      return error.response.data;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
