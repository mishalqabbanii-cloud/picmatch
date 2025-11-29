import { type FormEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import './SignupPage.css'

export const SignupPage: React.FC = () => {
  const { currentUser, signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'client' | 'photographer'>('client')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  if (currentUser) {
    navigate(-1)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    const result = signup({ name, email, password, role })
    if (!result.success) {
      if (result.reason === 'email_taken') {
        setError('This email is already in use. Please use another email.')
      } else {
        setError('Please fill in all fields correctly.')
      }
      return
    }

    const target = (location.state as { from?: string } | null)?.from
    if (target) {
      navigate(target, { replace: true })
    } else {
      if (role === 'client') navigate('/dashboard/client', { replace: true })
      else if (role === 'photographer') navigate('/dashboard/photographer', { replace: true })
    }
  }

  return (
    <div className="page signup-page">
      <div className="signup-card">
        <h1>Create account</h1>
        <p className="muted">Sign up and choose whether you are a client or photographer.</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              required
            />
          </label>

          <div className="role-toggle">
            <span className="role-label">Sign up as</span>
            <div className="role-options">
              <button
                type="button"
                className={role === 'client' ? 'role-btn active' : 'role-btn'}
                onClick={() => setRole('client')}
              >
                Client
              </button>
              <button
                type="button"
                className={role === 'photographer' ? 'role-btn active' : 'role-btn'}
                onClick={() => setRole('photographer')}
              >
                Photographer
              </button>
            </div>
          </div>

          {error && <p className="signup-error">{error}</p>}

          <button type="submit" className="btn primary signup-button">
            Create account
          </button>
        </form>
      </div>
    </div>
  )
}


