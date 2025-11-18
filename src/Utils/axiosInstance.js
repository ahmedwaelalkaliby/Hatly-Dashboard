import axios from "axios";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

const axiosInstance = axios.create({
  // baseURL: process.env.NODE_ENV === "development" ? "https://hatly-api.onrender.com/api/v2" : "https://api.hatly.tech/api/v2",
  baseURL: "https://hatly-api.onrender.com/api/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      config.data = {
        ...config.data,
        refreshToken: refreshToken,
      };
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    if (response.data.refreshToken) {
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest.url !== "/auth/login" && originalRequest.url !== "/auth/refresh") {
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          try {
            const response = await axiosInstance.post("/auth/refresh", {
              refreshToken: refreshToken,
              token: localStorage.getItem("accessToken"),
            });

            if (response.status === 200) {
              localStorage.setItem("accessToken", response.data.accessToken);
              localStorage.setItem("refreshToken", response.data.refreshToken);
              processQueue(null, response.data.accessToken);
              isRefreshing = false;
              return axiosInstance.request(originalRequest);
            }
          } catch (refreshError) {
            console.error("Refresh token error:", refreshError);
            processQueue(refreshError, null);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            isRefreshing = false;
            return Promise.reject({
              message: "Session expired",
              shouldRedirect: true,
            });
          }
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance.request(originalRequest));
          },
          reject: (err) => reject(err),
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
