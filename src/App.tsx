import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminPanel from './pages/AdminPanel'

type Page = 'home' | 'admin-login' | 'admin-panel'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentPage('admin-panel')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentPage('home')
    localStorage.removeItem('token')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onAdminClick={() => setCurrentPage('admin-login')} />
      case 'admin-login':
        return (
          <AdminLogin
            onLoginSuccess={handleLogin}
            onBack={() => setCurrentPage('home')}
          />
        )
      case 'admin-panel':
        return <AdminPanel onLogout={handleLogout} />
      default:
        return <Home onAdminClick={() => setCurrentPage('admin-login')} />
    }
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors">
          {renderPage()}
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App