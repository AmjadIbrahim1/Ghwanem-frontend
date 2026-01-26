export const APP_NAME = import.meta.env.VITE_APP_NAME || 'نظام نتائج الطلاب'
export const SCHOOL_NAME = import.meta.env.VITE_SCHOOL_NAME || 'مدرسة الغوانم'

export const SEMESTERS = [
  'الفصل الدراسي الأول',
  'الفصل الدراسي الثاني',
] as const

export const GRADE_COLORS = {
  excellent: 'text-green-600 dark:text-green-400',
  veryGood: 'text-blue-600 dark:text-blue-400',
  good: 'text-yellow-600 dark:text-yellow-400',
  acceptable: 'text-orange-600 dark:text-orange-400',
  weak: 'text-red-600 dark:text-red-400',
} as const

export const getGradeLevel = (percentage: number) => {
  if (percentage >= 85) return 'excellent'
  if (percentage >= 75) return 'veryGood'
  if (percentage >= 65) return 'good'
  if (percentage >= 50) return 'acceptable'
  return 'weak'
}

export const MEDAL_COLORS = {
  1: 'text-yellow-500',
  2: 'text-gray-400',
  3: 'text-amber-700',
} as const