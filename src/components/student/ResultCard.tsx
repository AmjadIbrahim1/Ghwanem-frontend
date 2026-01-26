import { Award, Download, Trophy, User, BarChart2, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Student } from '../../types'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { generatePDF } from '../../utils/pdfGenerator'

interface ResultCardProps {
  student: Student
}

export default function ResultCard({ student }: ResultCardProps) {
  const handleDownloadPDF = () => {
    generatePDF(student)
  }

  const totalMaxScore = student.grades.reduce((sum, grade) => sum + grade.maxScore, 0)
  const totalPercentage = ((student.totalScore / totalMaxScore) * 100).toFixed(2)

  // Prepare data for subject performance chart
  const subjectData = student.grades.map(grade => ({
    subject: grade.subject,
    score: grade.score,
    percentage: ((grade.score / grade.maxScore) * 100).toFixed(1)
  }))

  // Prepare data for score distribution chart
  const scoreDistribution = student.grades.map(grade => ({
    subject: grade.subject.substring(0, 15) + (grade.subject.length > 15 ? '...' : ''),
    obtained: grade.score,
    remaining: grade.maxScore - grade.score
  }))

  const getGradeColor = (percentage: number) => {
    if (percentage >= 85) return '#28A745'
    if (percentage >= 75) return '#1E90FF'
    if (percentage >= 65) return '#FFC107'
    if (percentage >= 50) return '#FF9800'
    return '#F44336'
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* School Header */}
      {student.schoolInfo && (
        <Card className="text-center bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {student.schoolInfo.schoolName}
          </h1>
          <p className="text-lg text-green-600 dark:text-green-400 font-semibold mb-1">
            {student.schoolInfo.educationOffice}
          </p>
          <p className="text-md text-gray-700 dark:text-gray-300">
            {student.grade}
          </p>
        </Card>
      )}

      {/* Student Header Card */}
      <Card className="bg-gradient-to-br from-primary-blue-light to-primary-green-light dark:from-primary-blue-dark dark:to-primary-green-dark text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-full">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-1">{student.name}</h2>
              <p className="text-lg opacity-90">رقم الجلوس: {student.seatNumber}</p>
              <p className="text-md opacity-80">{student.academicYear} - {student.semester}</p>
            </div>
          </div>
          
          <Button
            onClick={handleDownloadPDF}
            icon={<Download className="w-5 h-5" />}
            className="bg-white/10 border-white text-white hover:bg-white hover:text-primary-blue-light dark:hover:text-primary-blue-dark"
          >
            تحميل PDF
          </Button>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card hover>
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 p-4 rounded-full">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">المجموع الكلي</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {student.totalScore.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">من {totalMaxScore}</p>
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center gap-4">
            <div className="bg-green-500 p-4 rounded-full">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">النسبة المئوية</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {totalPercentage}%
              </p>
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500 p-4 rounded-full">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">الترتيب</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                #{student.rank}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Subject Performance Chart */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              أداء الطالب في المواد
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis 
                dataKey="subject" 
                angle={-45}
                textAnchor="end"
                height={100}
                style={{ fontSize: '11px' }}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: any) => [`${value}%`, 'النسبة']}
              />
              <Bar dataKey="percentage" fill="#1E90FF" radius={[8, 8, 0, 0]}>
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getGradeColor(parseFloat(entry.percentage))} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Score Distribution Chart */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              توزيع الدرجات
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis 
                dataKey="subject" 
                type="category"
                width={120}
                style={{ fontSize: '11px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="obtained" stackId="a" fill="#28A745" />
              <Bar dataKey="remaining" stackId="a" fill="#E5E7EB" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Grades Table */}
      <Card>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          تفاصيل الدرجات
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                  المادة
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 dark:text-gray-300">
                  الدرجة
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 dark:text-gray-300">
                  النهاية العظمى
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 dark:text-gray-300">
                  النسبة المئوية
                </th>
              </tr>
            </thead>
            <tbody>
              {student.grades.map((grade, index) => {
                const percentage = parseFloat(((grade.score / grade.maxScore) * 100).toFixed(1))
                const color = getGradeColor(percentage)
                return (
                  <tr
                    key={grade.id}
                    className={`border-b border-gray-200 dark:border-gray-700 ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'
                    } hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors`}
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100 font-medium">
                      {grade.subject}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-lg" style={{ color }}>
                        {grade.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">
                      {grade.maxScore}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold" style={{ color }}>
                        {percentage}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Developer Info Footer */}
      {student.schoolInfo && (
        <Card className="text-center bg-gray-50 dark:bg-gray-800/50">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">تطوير وبرمجة</p>
          <div className="space-y-1">
            <p className="font-bold text-gray-800 dark:text-gray-100">
              {student.schoolInfo.developerName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Phone: {student.schoolInfo.developerPhone}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Email: {student.schoolInfo.developerEmail}
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}