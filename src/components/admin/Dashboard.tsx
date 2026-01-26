import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BarChart3, Loader2 } from 'lucide-react'
import api from '../../services/api'
import { ApiResponse, AnalyticsData } from '../../types'
import Card from '../ui/Card'
import StatsCards from '../analytics/StatsCards'
import ChartsSection from '../analytics/ChartsSection'

export default function Dashboard() {
  const [selectedGrade, setSelectedGrade] = useState<string>('الصف الأول الإعدادي')

  const grades = [
    'الصف الأول الإعدادي',
    'الصف الثانى الإعدادي',
  ]

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['analytics', selectedGrade],
    queryFn: () => api.get<ApiResponse<AnalyticsData>>(`/analytics?grade=${selectedGrade}`),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary-blue-light dark:text-primary-blue-dark" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary-blue-light dark:text-primary-blue-dark" />
          <h2 className="text-3xl font-bold font-almarai text-gray-800 dark:text-gray-100">
            لوحة المعلومات
          </h2>
        </div>

        {/* Grade Selection */}
        <div className="flex gap-2">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedGrade === grade
                  ? 'bg-primary-blue-light dark:bg-primary-blue-dark text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {!data?.success || !data.data ? (
        <Card className="text-center py-20">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            لا توجد بيانات متاحة لـ {selectedGrade}. قم برفع ملف الدرجات أولاً.
          </p>
        </Card>
      ) : (
        <>
          {/* Stats Cards */}
          <StatsCards selectedGrade={selectedGrade} />

          {/* Charts */}
          <ChartsSection data={data.data} />

          {/* Subject Statistics */}
          {data.data.subjectStats && data.data.subjectStats.length > 0 && (
            <Card>
              <h3 className="text-2xl font-bold font-almarai text-gray-800 dark:text-gray-100 mb-6">
                إحصائيات المواد - {selectedGrade}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                        المادة
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 dark:text-gray-300">
                        المتوسط
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 dark:text-gray-300">
                        أعلى درجة
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 dark:text-gray-300">
                        أقل درجة
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data.subjectStats.map((stat, index) => (
                      <tr
                        key={stat.subject}
                        className={`
                          border-b border-gray-200 dark:border-gray-700
                          ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}
                        `}
                      >
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100 font-medium">
                          {stat.subject}
                        </td>
                        <td className="px-6 py-4 text-center text-primary-blue-light dark:text-primary-blue-dark font-bold">
                          {stat.average.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center text-green-600 dark:text-green-400 font-bold">
                          {stat.highest.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center text-red-600 dark:text-red-400 font-bold">
                          {stat.lowest.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  )
}