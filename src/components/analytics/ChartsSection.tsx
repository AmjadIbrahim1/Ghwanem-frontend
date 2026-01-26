import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { AnalyticsData } from '../../types'
import Card from '../ui/Card'

interface ChartsSectionProps {
  data: AnalyticsData
}

export default function ChartsSection({ data }: ChartsSectionProps) {
  const COLORS = ['#1E90FF', '#28A745', '#FFC107', '#F44336', '#9C27B0', '#FF9800']

  // Check if we have data
  if (!data.scoreDistribution || data.scoreDistribution.length === 0) {
    return (
      <Card className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          لا توجد بيانات كافية لعرض الرسوم البيانية
        </p>
      </Card>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Score Distribution Chart */}
      <Card>
        <h3 className="text-xl font-bold font-almarai text-gray-800 dark:text-gray-100 mb-4">
          توزيع الدرجات
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.scoreDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis
              dataKey="range"
              stroke="#6B7280"
              style={{ fontSize: '12px', fill: '#6B7280' }}
            />
            <YAxis
              stroke="#6B7280"
              style={{ fontSize: '12px', fill: '#6B7280' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar dataKey="count" fill="#1E90FF" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Subject Performance Pie Chart */}
      {data.subjectStats && data.subjectStats.length > 0 && (
        <Card>
          <h3 className="text-xl font-bold font-almarai text-gray-800 dark:text-gray-100 mb-4">
            أداء المواد
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.subjectStats}
                dataKey="average"
                nameKey="subject"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.subject}: ${entry.average.toFixed(1)}`}
              >
                {data.subjectStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  )
}