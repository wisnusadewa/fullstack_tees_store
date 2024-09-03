import axios from "axios";
// import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
});

// const accessToken = JSON.parse(localStorage.getItem("accessToken")); // mengambil accessToken dari localStorage

// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response.status === 403 &&
//       !originalRequest._retry &&
//       error.response.data.messege === "Unauthorize"
//     ) {
//       originalRequest._retry = true;
//       try {
//         const response = await axiosInstance.get("/token");
//         localStorage.setItem("accessToken", response.data.accessToken);
//         axiosInstance.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${response.data.accessToken}`;
//         return axiosInstance(error.config);
//       } catch (error) {
//         console.log(error, "token refresh gagal");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
