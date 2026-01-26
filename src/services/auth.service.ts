import api from './api'
import { LoginCredentials, AuthResponse, ApiResponse, Admin } from '../types'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return await api.post<AuthResponse>('/auth/login', credentials)
  },

  async verify(): Promise<ApiResponse<{ user: Admin }>> {
    return await api.get<ApiResponse<{ user: Admin }>>('/auth/verify')
  },

  async logout(): Promise<ApiResponse> {
    return await api.post<ApiResponse>('/auth/logout')
  },
}