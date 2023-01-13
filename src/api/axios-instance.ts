import axios from "redaxios";
import { paramsSerializer } from "@/api/paramsSerializer";

export const backendAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_API_URL,
  paramsSerializer,
});