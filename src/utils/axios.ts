import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const refresh = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// // Symbol to mark retried requests to avoid naming collisions
// const RETRY_REQUEST = Symbol("axios_retry_request");

// // Add a response error interceptor
// http.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     console.log({ originalRequest });

//     // Check if the error is 401 and it's not a retry request
//     if (error.response.status === 401 && !originalRequest[RETRY_REQUEST]) {
//       // If the error is on the login request, don't attempt to refresh the token
//       if (originalRequest.url === "/login") {
//         return Promise.reject(error);
//       }
//       // Create a separate Axios instance for refreshing the token
//       try {
//         // Attempt to refresh the token
//         await refresh.get("/login");

//         // Retry the original request using the custom http instance
//         return refresh.request(originalRequest);
//       } catch (refreshError) {
//         console.log({ refreshError });

//         return Promise.reject(refreshError);
//       }
//     }
//     console.log({ error });
//     // For other errors, just reject the promise
//     return Promise.reject(error);
//   }
// );

/**
 * Note: The RETRY_REQUEST Symbol is used to mark requests that have already been retried.
 * This avoids potential naming collisions with other properties on the request config object.
 */
