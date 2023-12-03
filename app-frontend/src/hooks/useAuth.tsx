import React, { createContext, useContext, useState } from 'react'

type AuthContextType = {
  user: any
  login: Function
  logout: Function
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AlertProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (data: any) => {
    setUser(data.data)
    sessionStorage.setItem('auth_token', data.token)
  }

  const logout = () => {
    setUser(null)
    sessionStorage.clear()
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
