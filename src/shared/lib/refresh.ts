import { api } from "@/shared/api/client";

var isRefreshing = false;
var failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: any) => void;
}[] = [];

function processQueue(error: any = null) {
  failedQueue.forEach(p =>
    error ? p.reject(error) : p.resolve()
  );
  failedQueue = [];
}

export async function refreshInterceptor(error: any) {
  const originalRequest = error.config;

  if (
    error.response?.status !== 401 ||
    originalRequest._retry
  ) {
    return Promise.reject(error);
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then(() => api(originalRequest));
  }

  originalRequest._retry = true;
  isRefreshing = true;

  try {
    await api.post("auth/refresh");

    processQueue();
    return api(originalRequest);
  } catch (refreshError) {
    processQueue(refreshError);
    await api.post("auth/logout");

    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
}
