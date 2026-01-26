import { Grade } from '../../types'

interface GradesTableProps {
  grades: Grade[]
}

export default function GradesTable({ grades }: GradesTableProps) {
  const getPercentage = (score: number, maxScore: number) => {
    return ((score / maxScore) * 100).toFixed(1)
  }

  const getGradeColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600 dark:text-green-400'
    if (percentage >= 75) return 'text-blue-600 dark:text-blue-400'
    if (percentage >= 65) return 'text-yellow-600 dark:text-yellow-400'
    if (percentage >= 50) return 'text-orange-600 dark:text-orange-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
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
          {grades.map((grade, index) => {
            const percentage = parseFloat(getPercentage(grade.score, grade.maxScore))
            return (
              <tr
                key={grade.id}
                className={`
                  border-b border-gray-200 dark:border-gray-700
                  ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}
                  hover:bg-gray-100 dark:hover:bg-gray-700/50
                  transition-colors
                `}
              >
                <td className="px-6 py-4 text-gray-800 dark:text-gray-100 font-medium">
                  {grade.subject}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`font-bold text-lg ${getGradeColor(percentage)}`}>
                    {grade.score}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">
                  {grade.maxScore}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`font-bold ${getGradeColor(percentage)}`}>
                    {percentage}%
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}