import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api/v1",
});

let isRefreshing = false;
let subscribers = [];

function subscribeToken(cb) {
  subscribers.push(cb);
}

function onRefreshed(token) {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const response = await axios.post(
            "http://localhost:8080/api/v1/auth/refresh",
            { token: refreshToken }
          );

          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);

          isRefreshing = false;
          onRefreshed(response.data.accessToken);
        } catch (e) {
          isRefreshing = false;
          window.location.href = "/login";
        }
      }

      return new Promise((resolve) => {
        subscribeToken((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          resolve(api(original));
        });
      });
    }

    return Promise.reject(err);
  }
);

export default api;
