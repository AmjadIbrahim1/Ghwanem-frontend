import { useState, useEffect } from 'react'
import { Search, Trophy, TrendingUp } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SearchBar from '../components/student/SearchBar'
import ResultCard from '../components/student/ResultCard'
import TopStudents from '../components/analytics/TopStudents'
import StatsCards from '../components/analytics/StatsCards'
import { gradesService } from '../services/grades.service'
import api from '../services/api'
import { Student, ApiResponse, AcademicSettings, SchoolInfo } from '../types'

interface HomeProps {
  onAdminClick: () => void
}

export default function Home({ onAdminClick }: HomeProps) {
  const [selectedGrade, setSelectedGrade] = useState<string>('')
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [academicSettings, setAcademicSettings] = useState<AcademicSettings | null>(null)
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo | null>(null)

  const grades = [
    'الصف الأول الإعدادي',
    'الصف الثانى الإعدادي',
  ]

  useEffect(() => {
    fetchSchoolInfo()
  }, [])

  useEffect(() => {
    if (selectedGrade) {
      fetchAcademicSettings()
    }
  }, [selectedGrade])

  const fetchSchoolInfo = async () => {
    try {
      const response = await api.get<ApiResponse<SchoolInfo>>('/school/settings')
      if (response.success && response.data) {
        setSchoolInfo(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch school info:', err)
    }
  }

  const fetchAcademicSettings = async () => {
    try {
      const response = await api.get<ApiResponse<AcademicSettings>>(`/academic/settings?grade=${selectedGrade}`)
      if (response.success && response.data) {
        setAcademicSettings(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch academic settings:', err)
    }
  }

  const handleSearch = async (seatNumber: string) => {
    if (!selectedGrade) {
      setError('يرجى اختيار الصف الدراسي أولاً')
      return
    }

    setLoading(true)
    setError(null)
    setStudent(null)

    try {
      const response = await gradesService.getStudentBySeatNumber(seatNumber, selectedGrade)
      if (response.success && response.data) {
        setStudent(response.data)
      } else {
        setError(response.error || 'لم يتم العثور على الطالب')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'حدث خطأ أثناء البحث')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAdminClick={onAdminClick} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-blue-light to-primary-green-light dark:from-primary-blue-dark dark:to-primary-green-dark py-20">
          <div className="container mx-auto px-4">
            {/* School Info Header */}
            {schoolInfo && (
              <div className="text-center text-white mb-8">
                <h1 className="text-4xl md:text-5xl font-bold font-almarai mb-2">
                  {schoolInfo.schoolName}
                </h1>
                <p className="text-xl md:text-2xl opacity-90 mb-4">
                  {schoolInfo.educationOffice}
                </p>
                <div className="w-32 h-1 bg-white/50 mx-auto rounded-full"></div>
              </div>
            )}

            <div className="text-center text-white mb-8">
              <h2 className="text-3xl md:text-4xl font-bold font-almarai mb-4">
                نظام نتائج الطلاب
              </h2>
              
              {/* Academic Settings Info */}
              {academicSettings && selectedGrade && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto mb-6">
                  <p className="text-xl font-semibold mb-2">
                    {academicSettings.academicYear} - {academicSettings.semester}
                  </p>
                  <p className="text-lg opacity-90">
                    {selectedGrade}
                  </p>
                </div>
              )}
              
              <p className="text-xl opacity-90">
                ابحث عن نتيجتك باستخدام رقم الجلوس
              </p>
            </div>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Grade Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-3 text-lg">
                  اختر الصف الدراسي
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {grades.map((grade) => (
                    <button
                      key={grade}
                      onClick={() => {
                        setSelectedGrade(grade)
                        setStudent(null)
                        setError(null)
                      }}
                      className={`px-6 py-4 rounded-lg font-medium transition-all text-center ${
                        selectedGrade === grade
                          ? 'bg-primary-blue-light dark:bg-primary-blue-dark text-white shadow-lg scale-105'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              {selectedGrade && (
                <div className="animate-fade-in">
                  <SearchBar onSearch={handleSearch} loading={loading} />
                </div>
              )}
              
              {error && (
                <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-center">
                  {error}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Result Section */}
        {student && (
          <section className="py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <ResultCard student={student} />
            </div>
          </section>
        )}

        {/* Stats Section */}
        {selectedGrade && (
          <section className="py-12 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-3 mb-8">
                <TrendingUp className="w-8 h-8 text-primary-green-light dark:text-primary-green-dark" />
                <h2 className="text-3xl font-bold font-almarai text-gray-800 dark:text-gray-100">
                  إحصائيات عامة - {selectedGrade}
                </h2>
              </div>
              <StatsCards selectedGrade={selectedGrade} />
            </div>
          </section>
        )}

        {/* Top Students Section */}
        {selectedGrade && (
          <section className="py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <h2 className="text-3xl font-bold font-almarai text-gray-800 dark:text-gray-100">
                  الطلاب الأوائل - {selectedGrade}
                </h2>
              </div>
              <TopStudents selectedGrade={selectedGrade} />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}