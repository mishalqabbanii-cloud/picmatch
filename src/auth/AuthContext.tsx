import { createContext, useContext, useMemo, useState } from 'react'
import { admins, clients, mockStore, photographers } from '../mock/mockData'

export type Role = 'client' | 'photographer' | 'admin'

export interface CurrentUser {
  id: string
  name: string
  email: string
  role: Role
}

interface AuthContextValue {
  currentUser: CurrentUser | null
  loginByEmail: (
    email: string,
    password: string,
  ) =>
    | { success: true }
    | { success: false; reason: 'not_found' | 'invalid_credentials' }
  signup: (input: {
    name: string
    email: string
    password: string
    role: Role
  }) => { success: true } | { success: false; reason: 'email_taken' | 'invalid_input' }
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

  const loginByEmail = (rawEmail: string, rawPassword: string) => {
    const email = rawEmail.trim().toLowerCase()
    const password = rawPassword.trim()
    if (!email || !password) {
      return { success: false, reason: 'invalid_credentials' as const }
    }

    const client = clients.find((c) => c.email.toLowerCase() === email)
    if (client) {
      if (client.password !== password) {
        return { success: false as const, reason: 'invalid_credentials' as const }
      }
      setCurrentUser({ id: client.id, name: client.name, email: client.email, role: 'client' })
      return { success: true as const }
    }

    const photographer = photographers.find((p) => p.email.toLowerCase() === email)
    if (photographer) {
      if (photographer.password !== password) {
        return { success: false as const, reason: 'invalid_credentials' as const }
      }
      setCurrentUser({
        id: photographer.id,
        name: photographer.name,
        email: photographer.email,
        role: 'photographer',
      })
      return { success: true as const }
    }

    const admin = admins.find((a) => a.email.toLowerCase() === email)
    if (admin) {
      if (admin.password !== password) {
        return { success: false as const, reason: 'invalid_credentials' as const }
      }
      setCurrentUser({ id: admin.id, name: admin.name, email: admin.email, role: 'admin' })
      return { success: true as const }
    }

    return { success: false as const, reason: 'not_found' as const }
  }

  const signup: AuthContextValue['signup'] = ({ name, email, password, role }) => {
    const trimmedName = name.trim()
    const trimmedEmail = email.trim().toLowerCase()
    const trimmedPassword = password.trim()

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      return { success: false, reason: 'invalid_input' as const }
    }

    const existsInClients = clients.some((c) => c.email.toLowerCase() === trimmedEmail)
    const existsInPhotographers = photographers.some((p) => p.email.toLowerCase() === trimmedEmail)
    const existsInAdmins = admins.some((a) => a.email.toLowerCase() === trimmedEmail)
    if (existsInClients || existsInPhotographers || existsInAdmins) {
      return { success: false, reason: 'email_taken' as const }
    }

    if (role === 'client') {
      const newClientId = `c${clients.length + 1}`
      const newClient = {
        id: newClientId,
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      }
      clients.push(newClient)
      setCurrentUser({
        id: newClient.id,
        name: newClient.name,
        email: newClient.email,
        role: 'client',
      })
      return { success: true as const }
    }

    if (role === 'photographer') {
      const newPhotographerId = `p${photographers.length + 1}`
      const newPhotographer = {
        id: newPhotographerId,
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
        city: 'Unknown',
        styles: [],
        priceRange: { min: 0, max: 0 },
        rating: 0,
        reviewCount: 0,
        bio: '',
        portfolio: [],
        packages: [],
      }
      photographers.push(newPhotographer)
      setCurrentUser({
        id: newPhotographer.id,
        name: newPhotographer.name,
        email: newPhotographer.email,
        role: 'photographer',
      })
      return { success: true as const }
    }

    const newAdminId = `a${admins.length + 1}`
    const newAdmin = {
      id: newAdminId,
      name: trimmedName,
      email: trimmedEmail,
      password: trimmedPassword,
    }
    admins.push(newAdmin)
    setCurrentUser({
      id: newAdmin.id,
      name: newAdmin.name,
      email: newAdmin.email,
      role: 'admin',
    })
    return { success: true as const }
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const value = useMemo(
    () => ({
      currentUser,
      loginByEmail,
      signup,
      logout,
    }),
    [currentUser],
  )

  // Access mockStore just to avoid TS "unused" warning for now if imports change later.
  void mockStore

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}


