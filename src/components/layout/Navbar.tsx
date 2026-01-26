import { GraduationCap, UserCog } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'
import Button from '../ui/Button'

interface NavbarProps {
  onAdminClick: () => void
}

export default function Navbar({ onAdminClick }: NavbarProps) {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary-blue-light to-primary-green-light dark:from-primary-blue-dark dark:to-primary-green-dark p-3 rounded-xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-almarai text-gray-800 dark:text-gray-100">
                مدرسة الغوانم
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                نظام النتائج الإلكتروني
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="outline"
              onClick={onAdminClick}
              icon={<UserCog className="w-5 h-5" />}
            >
              دخول المدير
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}