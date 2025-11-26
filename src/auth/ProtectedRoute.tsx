import { Navigate } from 'react-router-dom'
import type { Role } from './AuthContext'
import { useAuth } from './AuthContext'

interface ProtectedRouteProps {
  allowedRoles: Role[]
  children: React.ReactElement
}

const dashboardPathForRole = (role: Role): string => {
  if (role === 'client') return '/dashboard/client'
  if (role === 'photographer') return '/dashboard/photographer'
  return '/dashboard/admin'
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to={dashboardPathForRole(currentUser.role)} replace />
  }

  return children
}


