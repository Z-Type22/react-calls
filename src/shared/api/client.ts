import axios, { AxiosHeaders } from "axios";
import { axiosConfig } from '@/shared/config/axios.config';

import type { InternalAxiosRequestConfig } from "axios";

export const api = axios.create(axiosConfig)

async function fetchCsrfToken() {
  const response = await api.get("csrf-token");
  return response.data.csrf_token;
}

api.interceptors.request.use(async (config: InternalAxiosRequestConfig ) => {
  if (!config.headers) new AxiosHeaders();

  if (["post", "put", "patch", "delete"].includes(config.method || "")) {
    const csrfToken = await fetchCsrfToken();
    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});
