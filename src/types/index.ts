// Student Types
export interface Student {
  id: string
  seatNumber: string
  name: string
  totalScore: number
  rank: number
  academicYear: string
  semester: string
  grade: string
  grades: Grade[]
  schoolInfo?: SchoolInfo
  createdAt: string
  updatedAt: string
}

export interface Grade {
  id: string
  subject: string
  score: number
  maxScore: number
  studentId: string
  createdAt: string
  updatedAt: string
}

export interface SchoolInfo {
  schoolName: string
  educationOffice: string
  developerName: string
  developerPhone: string
  developerEmail: string
}

// Auth Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  data?: {
    token: string
    admin: {
      id: string
      email: string
    }
  }
  error?: string
}

export interface Admin {
  id: string
  email: string
  name?: string
}

// Academic Types
export interface AcademicSettings {
  id: string
  academicYear: string
  semester: string
  grade: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Analytics Types
export interface AnalyticsData {
  totalStudents: number
  averageScore: number
  highestScore: number
  lowestScore: number
  passRate: number
  topStudents: TopStudent[]
  subjectStats: SubjectStats[]
  scoreDistribution: ScoreDistribution[]
}

export interface TopStudent {
  seatNumber: string
  name: string
  totalScore: number
  rank: number
}

export interface SubjectStats {
  subject: string
  average: number
  highest: number
  lowest: number
}

export interface ScoreDistribution {
  range: string
  count: number
  percentage: number
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
}

// Excel Upload Types
export interface ExcelUploadResponse {
  totalStudents: number
  academicYear: string
  semester: string
  grade: string
}

// Theme Types
export type Theme = 'light' | 'dark'