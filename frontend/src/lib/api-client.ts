import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string, headers: Record<string, string> = {}) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor (e.g., add auth token)
    this.client.interceptors.request.use((config) => {
      // Keep token key consistent with auth-slice storage
      const token = localStorage.getItem("userToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor (e.g., error formatting)
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError = {
          message: (error.response?.data as any)?.message || error.message,
          status: error.response?.status || 500,
          code: (error.response?.data as any)?.code,
        };
        return Promise.reject(apiError);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

// Ensure baseURL points to API prefix used by backend ("/api/v1")
const apiClient = new ApiClient(
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"
);

export default apiClient;
