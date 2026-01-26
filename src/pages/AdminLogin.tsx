import { useState } from 'react'
import { ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react'
import { authService } from '../services/auth.service'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

interface AdminLoginProps {
  onLoginSuccess: () => void
  onBack: () => void
}

export default function AdminLogin({ onLoginSuccess, onBack }: AdminLoginProps) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await authService.login({ email, password })
      
      if (response.success && response.data) {
        login(response.data.token, response.data.admin)
        onLoginSuccess()
      } else {
        setError(response.error || 'فشل تسجيل الدخول')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'حدث خطأ أثناء تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-blue-light to-primary-green-light dark:from-primary-blue-dark dark:to-primary-green-dark p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-blue-light dark:hover:text-primary-blue-dark transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            <span>رجوع</span>
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-blue-light dark:bg-primary-blue-dark rounded-full mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-almarai text-gray-800 dark:text-gray-100 mb-2">
              تسجيل دخول المدير
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              قم بإدخال بيانات الدخول للوصول إلى لوحة التحكم
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@school.com"
              icon={<Mail className="w-5 h-5" />}
              required
            />

            <Input
              type="password"
              label="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Lock className="w-5 h-5" />}
              required
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
            >
              تسجيل الدخول
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}