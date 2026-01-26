import { useState } from 'react'
import { LogOut, Upload, Settings, BarChart3 } from 'lucide-react'
import ThemeToggle from '../components/ui/ThemeToggle'
import ExcelUpload from '../components/admin/ExcelUpload'
import AcademicSettings from '../components/admin/AcademicSettings'
import Dashboard from '../components/admin/Dashboard'
import Button from '../components/ui/Button'

interface AdminPanelProps {
  onLogout: () => void
}

type Tab = 'dashboard' | 'upload' | 'settings'

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  const tabs = [
    { id: 'dashboard' as Tab, label: 'لوحة التحكم', icon: BarChart3 },
    { id: 'upload' as Tab, label: 'رفع الدرجات', icon: Upload },
    { id: 'settings' as Tab, label: 'الإعدادات', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-almarai text-gray-800 dark:text-gray-100">
              لوحة تحكم المدير
            </h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button
                variant="outline"
                onClick={onLogout}
                icon={<LogOut className="w-5 h-5" />}
              >
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-primary-blue-light dark:text-primary-blue-dark'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-blue-light dark:bg-primary-blue-dark rounded-t-full" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'upload' && <ExcelUpload />}
        {activeTab === 'settings' && <AcademicSettings />}
      </main>
    </div>
  )
}