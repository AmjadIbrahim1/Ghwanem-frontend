import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Admin } from '../types'

interface AuthContextType {
  admin: Admin | null
  token: string | null
  login: (token: string, admin: Admin) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token')
  })

  useEffect(() => {
    if (token) {
      // يمكن إضافة التحقق من صلاحية التوكن هنا
    }
  }, [token])

  const login = (newToken: string, newAdmin: Admin) => {
    setToken(newToken)
    setAdmin(newAdmin)
    localStorage.setItem('token', newToken)
  }

  const logout = () => {
    setToken(null)
    setAdmin(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}