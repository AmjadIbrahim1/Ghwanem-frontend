import { useState } from 'react'
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react'
import api from '../../services/api'
import { ApiResponse, ExcelUploadResponse } from '../../types'
import Card from '../ui/Card'
import Button from '../ui/Button'

export default function ExcelUpload() {
  const [selectedGrade, setSelectedGrade] = useState<string>('الصف الأول الإعدادي')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const grades = [
    'الصف الأول الإعدادي',
    'الصف الثانى الإعدادي',
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const isExcel = selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls')
      if (isExcel) {
        setFile(selectedFile)
        setError(null)
        setSuccess(null)
      } else {
        setError('يجب أن يكون الملف من نوع Excel (.xlsx أو .xls)')
        setFile(null)
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('grade', selectedGrade) // إضافة الصف إلى البيانات

      const response = await api.uploadFile<ApiResponse<ExcelUploadResponse>>(
        '/excel/upload',
        formData
      )

      if (response.success) {
        setSuccess(`تم رفع بيانات ${response.data?.totalStudents} طالب بنجاح لـ ${selectedGrade}!`)
        setFile(null)
        // Reset file input
        const fileInput = document.getElementById('file-upload') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        setError(response.error || 'فشل رفع الملف')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'حدث خطأ أثناء رفع الملف')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <h2 className="text-2xl font-bold font-almarai text-gray-800 dark:text-gray-100 mb-6">
          رفع ملف الدرجات
        </h2>

        <div className="space-y-6">
          {/* Grade Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              اختر الصف الدراسي
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

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-4"
            >
              <div className="bg-primary-blue-light dark:bg-primary-blue-dark p-6 rounded-full">
                <Upload className="w-12 h-12 text-white" />
              </div>
              
              <div>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اضغط لاختيار ملف Excel
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  سيتم رفع الملف لـ: <strong>{selectedGrade}</strong>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  يجب أن يحتوي الملف على أعمدة: رقم الجلوس، الاسم، والمواد
                </p>
              </div>
            </label>
          </div>

          {/* Selected File */}
          {file && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <FileSpreadsheet className="w-8 h-8 text-primary-blue-light dark:text-primary-blue-dark" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {file.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {(file.size / 1024).toFixed(2)} KB - سيتم رفعه لـ {selectedGrade}
                </p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-400 dark:border-green-800">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-green-700 dark:text-green-400">{success}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-400 dark:border-red-800">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Upload Button */}
          <Button
            variant="primary"
            fullWidth
            onClick={handleUpload}
            loading={uploading}
            disabled={!file || uploading}
          >
            رفع الملف لـ {selectedGrade}
          </Button>

          {/* Instructions */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">
              تعليمات مهمة:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• يجب أن يكون الملف بصيغة Excel (.xlsx أو .xls)</li>
              <li>• الصف الأول يجب أن يحتوي على عناوين الأعمدة</li>
              <li>• عمود "رقم الجلوس" و"الاسم" إلزاميان</li>
              <li>• باقي الأعمدة تعتبر مواد دراسية</li>
              <li>• <strong className="text-red-600 dark:text-red-400">مهم:</strong> كل صف له ملف Excel منفصل تماماً</li>
              <li>• عند رفع ملف جديد لنفس الصف، سيتم استبدال البيانات القديمة للصف المحدد فقط</li>
              <li>• بيانات الصف الآخر لن تتأثر</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}