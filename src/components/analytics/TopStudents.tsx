import { useQuery } from '@tanstack/react-query'
import { Award, Loader2, Trophy } from 'lucide-react'
import api from '../../services/api'
import { ApiResponse, AnalyticsData } from '../../types'
import Card from '../ui/Card'

interface TopStudentsProps {
  selectedGrade?: string
}

export default function TopStudents({ selectedGrade }: TopStudentsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['analytics', selectedGrade],
    queryFn: () => api.get<ApiResponse<AnalyticsData>>(`/analytics${selectedGrade ? `?grade=${selectedGrade}` : ''}`),
  })

  if (isLoading) {
    return (
      <Card className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-blue-light dark:text-primary-blue-dark" />
      </Card>
    )
  }

  if (error || !data?.success || !data.data || !data.data.topStudents || data.data.topStudents.length === 0) {
    return (
      <Card className="text-center py-12 text-gray-600 dark:text-gray-400">
        لا توجد بيانات متاحة{selectedGrade ? ` لـ ${selectedGrade}` : ''}. قم برفع ملف الدرجات أولاً.
      </Card>
    )
  }

  const topStudents = data.data.topStudents.slice(0, 10)
  const maxScore = topStudents[0]?.totalScore || 500

  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500'
    if (rank === 2) return 'text-gray-400'
    if (rank === 3) return 'text-amber-700'
    return 'text-gray-600 dark:text-gray-400'
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {topStudents.map((student) => (
        <Card key={student.seatNumber} hover>
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-bold ${getMedalColor(student.rank)}`}>
              {student.rank <= 3 ? (
                <Trophy className="w-12 h-12" />
              ) : (
                <Award className="w-12 h-12" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xl font-bold font-almarai text-gray-800 dark:text-gray-100">
                  {student.name}
                </h4>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  #{student.rank}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                رقم الجلوس: {student.seatNumber}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-green-light to-primary-blue-light dark:from-primary-green-dark dark:to-primary-blue-dark h-2 rounded-full transition-all"
                    style={{ width: `${(student.totalScore / maxScore) * 100}%` }}
                  />
                </div>
                <span className="text-lg font-bold text-primary-blue-light dark:text-primary-blue-dark">
                  {student.totalScore.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}