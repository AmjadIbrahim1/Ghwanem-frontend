// frontend/src/services/grades.service.ts
import api from './api'
import { ApiResponse, Student } from '../types'

export const gradesService = {
  async getStudentBySeatNumber(seatNumber: string, grade?: string): Promise<ApiResponse<Student>> {
    console.log('Frontend: Searching for student', { seatNumber, grade });
    
    // بناء الـ URL مع الـ query parameter
    const url = `/grades/student/${seatNumber}${grade ? `?grade=${encodeURIComponent(grade)}` : ''}`;
    console.log('Request URL:', url);
    
    return await api.get<ApiResponse<Student>>(url)
  },

  async getAllStudents(grade?: string): Promise<ApiResponse<Student[]>> {
    const params = grade ? { grade } : {}
    return await api.get<ApiResponse<Student[]>>('/grades/all', params)
  },

  async getStudentsByYear(
    academicYear: string,
    semester: string,
    grade?: string
  ): Promise<ApiResponse<Student[]>> {
    return await api.get<ApiResponse<Student[]>>('/grades/by-year', {
      academicYear,
      semester,
      ...(grade && { grade })
    })
  },
}