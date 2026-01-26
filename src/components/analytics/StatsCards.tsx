import { useQuery } from '@tanstack/react-query'
import { Users, TrendingUp, Award, CheckCircle, Loader2 } from 'lucide-react'
import api from '../../services/api'
import { ApiResponse, AnalyticsData } from '../../types'
import Card from '../ui/Card'

interface StatsCardsProps {
  selectedGrade?: string
}

export default function StatsCards({ selectedGrade }: StatsCardsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['analytics', selectedGrade],
    queryFn: () => api.get<ApiResponse<AnalyticsData>>(`/analytics${selectedGrade ? `?grade=${selectedGrade}` : ''}`),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-blue-light dark:text-primary-blue-dark" />
      </div>
    )
  }

  if (error || !data?.success || !data.data) {
    return (
      <Card className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          لا توجد بيانات متاحة{selectedGrade ? ` لـ ${selectedGrade}` : ''}. قم برفع ملف الدرجات أولاً.
        </p>
      </Card>
    )
  }

  const analytics = data.data

  const stats = [
    {
      title: 'إجمالي الطلاب',
      value: analytics.totalStudents || 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'متوسط الدرجات',
      value: (analytics.averageScore || 0).toFixed(2),
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'أعلى درجة',
      value: (analytics.highestScore || 0).toFixed(2),
      icon: Award,
      color: 'bg-yellow-500',
    },
    {
      title: 'نسبة النجاح',
      value: `${(analytics.passRate || 0).toFixed(1)}%`,
      icon: CheckCircle,
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} hover>
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-4 rounded-full`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}