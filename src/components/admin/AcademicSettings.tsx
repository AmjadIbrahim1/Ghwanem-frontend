import { useState, useEffect } from 'react'
import { Calendar, CheckCircle, AlertCircle, Cog } from 'lucide-react'
import api from '../../services/api'
import { ApiResponse, AcademicSettings as Settings, SchoolInfo } from '../../types'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'

export default function AcademicSettings() {
  const [selectedGrade, setSelectedGrade] = useState<string>('الصف الأول الإعدادي')
  const [academicYear, setAcademicYear] = useState('')
  const [semester, setSemester] = useState('الفصل الدراسي الأول')
  const [schoolName, setSchoolName] = useState('')
  const [educationOffice, setEducationOffice] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingSchool, setLoadingSchool] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const grades = [
    'الصف الأول الإعدادي',
    'الصف الثانى الإعدادي',
  ]

  useEffect(() => {
    fetchSettings()
    fetchSchoolSettings()
  }, [selectedGrade])

  const fetchSettings = async () => {
    setFetching(true)
    try {
      const response = await api.get<ApiResponse<Settings>>(`/academic/settings?grade=${selectedGrade}`)
      if (response.success && response.data) {
        setAcademicYear(response.data.academicYear)
        setSemester(response.data.semester)
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err)
    } finally {
      setFetching(false)
    }
  }

  const fetchSchoolSettings = async () => {
    try {
      const response = await api.get<ApiResponse<SchoolInfo>>('/school/settings')
      if (response.success && response.data) {
        setSchoolName(response.data.schoolName || '')
        setEducationOffice(response.data.educationOffice || '')
      }
    } catch (err) {
      console.error('Failed to fetch school settings:', err)
    }
  }

  const handleSubmitAcademic = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await api.put<ApiResponse<Settings>>('/academic/settings', {
        academicYear,
        semester,
        grade: selectedGrade,
      })

      if (response.success) {
        setSuccess(`تم تحديث إعدادات ${selectedGrade} بنجاح`)
        setTimeout(() => setSuccess(null), 3000)
      } else {
        setError(response.error || 'فشل تحديث الإعدادات')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'حدث خطأ أثناء التحديث')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitSchool = async () => {
    setLoadingSchool(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await api.put<ApiResponse>('/school/settings', {
        schoolName,
        educationOffice,
      })

      if (response.success) {
        setSuccess('تم تحديث معلومات المدرسة بنجاح')
        setTimeout(() => setSuccess(null), 3000)
      } else {
        setError(response.error || 'فشل تحديث معلومات المدرسة')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'حدث خطأ أثناء التحديث')
    } finally {
      setLoadingSchool(false)
    }
  }

  if (fetching) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">جاري التحميل...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {success && (
        <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-400 dark:border-green-800">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
          <p className="text-green-700 dark:text-green-400">{success}</p>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-400 dark:border-red-800">
          <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Academic Settings */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-8 h-8 text-primary-blue-light dark:text-primary-blue-dark" />
          <h2 className="text-2xl font-bold font-almarai text-gray-800 dark:text-gray-100">
            إعدادات السنة والفصل الدراسي
          </h2>
        </div>

        {/* Grade Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            اختر الصف لتحديث إعداداته
          </label>
          <div className="grid grid-cols-2 gap-3">
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-4 py-3 rounded-lg font-medium transition-all text-center ${
                  selectedGrade === grade
                    ? 'bg-primary-blue-light dark:bg-primary-blue-dark text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Input
            type="text"
            label="السنة الدراسية"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            placeholder="2024-2025"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الفصل الدراسي
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-primary-blue-light dark:focus:border-primary-blue-dark transition-colors"
              required
            >
              <option value="الفصل الدراسي الأول">الفصل الدراسي الأول</option>
              <option value="الفصل الدراسي الثاني">الفصل الدراسي الثاني</option>
            </select>
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={handleSubmitAcademic}
            loading={loading}
          >
            حفظ إعدادات {selectedGrade}
          </Button>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-400 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
              <strong>ملاحظة:</strong> 
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 mr-4">
              <li>• يتم حفظ إعدادات كل صف بشكل منفصل</li>
              <li>• هذه الإعدادات ستظهر للطلاب عند اختيار الصف</li>
              <li>• تحديث إعدادات صف لن يؤثر على الصفوف الأخرى</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* School Settings */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <Cog className="w-8 h-8 text-primary-green-light dark:text-primary-green-dark" />
          <h2 className="text-2xl font-bold font-almarai text-gray-800 dark:text-gray-100">
            معلومات المدرسة
          </h2>
        </div>

        <div className="space-y-6">
          <Input
            type="text"
            label="اسم المدرسة"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder="مدرسة الغوانم الاعدادية المشتركة"
          />

          <Input
            type="text"
            label="الإدارة التعليمية"
            value={educationOffice}
            onChange={(e) => setEducationOffice(e.target.value)}
            placeholder="إدارة ديروط التعليمية"
          />

          <Button
            variant="secondary"
            fullWidth
            onClick={handleSubmitSchool}
            loading={loadingSchool}
          >
            حفظ معلومات المدرسة
          </Button>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-400 dark:border-green-800">
            <p className="text-sm text-green-700 dark:text-green-400">
              <strong>ملاحظة:</strong> ستظهر هذه المعلومات في الصفحة الرئيسية وفي تقارير النتائج PDF
            </p>
          </div>

          {/* Developer Info - Read Only */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-2 border-gray-300 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              معلومات المطور (للقراءة فقط)
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <strong>الاسم:</strong> Eng : Amjad Ibrahim
              </p>
              <p>
                <strong>الهاتف:</strong> +201030615045
              </p>
              <p>
                <strong>البريد الإلكتروني:</strong> amjadibrahim218@gmail.com
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}