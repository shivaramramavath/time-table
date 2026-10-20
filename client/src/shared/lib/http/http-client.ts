import axios from "axios";
import { errorInterceptor, requestInterceptor } from "./interceptor";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(requestInterceptor);

httpClient.interceptors.response.use((response) => response, errorInterceptor);
