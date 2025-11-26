import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../auth/AuthContext'

const dashboardPathForRole = (role: 'client' | 'photographer' | 'admin'): string => {
  if (role === 'client') return '/dashboard/client'
  if (role === 'photographer') return '/dashboard/photographer'
  return '/dashboard/admin'
}

export const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const dashboardLink = currentUser ? dashboardPathForRole(currentUser.role) : null

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          PicMatch
        </Link>
      </div>
      <nav className="navbar-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>
        {!currentUser && (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Sign up
            </NavLink>
          </>
        )}
        {currentUser && dashboardLink && (
          <>
            <NavLink
              to={dashboardLink}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Dashboard
            </NavLink>
            <button type="button" className="nav-link logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  )
}

