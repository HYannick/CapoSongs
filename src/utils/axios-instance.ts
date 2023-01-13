import axios from "axios";
import { paramsSerializer } from "@/utils/paramsSerializer";

export const backendAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_API_URL,
  paramsSerializer: {
    serialize: paramsSerializer,
  },
});