// frontend/src/services/api.ts
import axios, { AxiosInstance, AxiosError } from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
      withCredentials: false, // مهم جداً!
    })

    // Log API URL in development
    console.log('=== API Configuration ===');
    console.log('Base URL:', API_URL);
    console.log('Environment:', import.meta.env.MODE);
    console.log('========================');

    this.api.interceptors.request.use(
      (config) => {
        console.log(`🔵 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          params: config.params,
          data: config.data
        });
        
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error)
      }
    )

    this.api.interceptors.response.use(
      (response) => {
        console.log(`✅ API Response: ${response.config.url}`, {
          status: response.status,
          data: response.data
        });
        return response;
      },
      (error: AxiosError) => {
        console.error('❌ API Error:', {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message
        });
        
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          // لا تعمل redirect تلقائي في حالة الخطأ
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.api.get<T>(url, { params })
    return response.data
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.api.post<T>(url, data)
    return response.data
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.api.put<T>(url, data)
    return response.data
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.api.delete<T>(url)
    return response.data
  }

  async uploadFile<T>(url: string, formData: FormData): Promise<T> {
    const response = await this.api.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}

export default new ApiService()
