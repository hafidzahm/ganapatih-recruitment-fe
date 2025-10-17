import axios from "axios";
export const http = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await http.post("/refresh-token");
      console.log("refresh token applied");
    }
    console.log({ errorInterceptor: error });
  }
);
