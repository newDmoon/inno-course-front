import axios from "axios";

function createApi(baseURL) {
  const api = axios.create({ baseURL });

  let isRefreshing = false;
  let subscribers = [];

  const subscribeToken = (cb) => {
    subscribers.push(cb);
  };

  const onRefreshed = (token) => {
    subscribers.forEach((cb) => cb(token));
    subscribers = [];
  };

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (err) => {
      const original = err.config;

      if ((err.response?.status === 401 || err.response?.status === 403) && !original._retry) {
        original._retry = true;

        // Попытка рефреша только для 401
        if (err.response.status === 401 && !isRefreshing) {
          isRefreshing = true;
          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await axios.post(
              "http://localhost:8081/api/v1/auth/refresh",
              { token: refreshToken }
            );
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            isRefreshing = false;
            onRefreshed(response.data.accessToken);
          } catch (e) {
            isRefreshing = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
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

  return api;
}

export const authApi = createApi("http://localhost:8081/api/v1");
export const usersAndCardsApi = createApi("http://localhost:8080/api/v1");
export const orderApi = createApi("http://localhost:8082/api/v1");
export const paymentApi = createApi("http://localhost:8080/api/v1/payment");
