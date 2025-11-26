import { type FormEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import './LoginPage.css'

const dashboardPathForRole = (role: 'client' | 'photographer' | 'admin'): string => {
  if (role === 'client') return '/dashboard/client'
  if (role === 'photographer') return '/dashboard/photographer'
  return '/dashboard/admin'
}

export const LoginPage: React.FC = () => {
  const { currentUser, loginByEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  if (currentUser) {
    // If already logged in, go straight to the appropriate dashboard.
    navigate(dashboardPathForRole(currentUser.role), { replace: true })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    const result = loginByEmail(email, password)
    if (!result.success) {
      if (result.reason === 'not_found') {
        setError('User not found. Please check your email.')
      } else {
        setError('Incorrect password. Please try again.')
      }
      return
    }

    // After login, go to dashboard or to a return path if we ever add one.
    const target =
      (location.state as { from?: string } | null)?.from ?? dashboardPathForRole(useAuth().currentUser!.role)
    navigate(target, { replace: true })
  }

  return (
    <div className="page login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-mark">PM</div>
          <div className="logo-text">
            <span className="name">PicMatch</span>
            <span className="tagline">Photographers, perfectly matched.</span>
          </div>
        </div>
        <h1>Sign in</h1>
        <p className="muted">Access your PicMatch account or create a new one.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alice@picmatch.test"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="btn primary login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}


