import './AdminDashboardPage.css'
import { mockStore } from '../mock/mockData'
import { useAuth } from '../auth/AuthContext'

export const AdminDashboardPage: React.FC = () => {
  const { currentUser } = useAuth()
  const { photographers, clients, bookings } = mockStore

  return (
    <div className="page admin-dashboard">
      <section className="hero">
        <h1>Admin overview</h1>
        <p className="muted">High-level view of users and bookings in the system.</p>
        {currentUser && (
          <p className="muted">
            Signed in as <strong>{currentUser.name}</strong> ({currentUser.email})
          </p>
        )}
      </section>

      <section className="section-card">
        <h2>Key metrics</h2>
        <div className="stats-row">
          <div className="stat-card">
            <span className="label">Photographers</span>
            <span className="value">{photographers.length}</span>
          </div>
          <div className="stat-card">
            <span className="label">Clients</span>
            <span className="value">{clients.length}</span>
          </div>
          <div className="stat-card">
            <span className="label">Bookings</span>
            <span className="value">{bookings.length}</span>
          </div>
        </div>
      </section>

      <div className="grid-2">
        <section className="section-card">
          <h2>Photographers</h2>
          <div className="table">
            {photographers.map((p) => (
              <div key={p.id} className="table-row">
                <div className="row-main">
                  <strong>{p.name}</strong>
                  <span className="muted">
                    {p.city} • {p.styles.join(', ')}
                  </span>
                </div>
                <div className="row-tags">
                  <span className="pill">⭐ {p.rating.toFixed(1)}</span>
                  <span className="muted">{p.reviewCount} reviews</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-card">
          <h2>Clients</h2>
          <div className="table">
            {clients.map((c) => {
              const count = bookings.filter((b) => b.clientId === c.id).length
              return (
                <div key={c.id} className="table-row">
                  <div className="row-main">
                    <strong>{c.name}</strong>
                  </div>
                  <div className="row-tags">
                    <span className="muted">{count} bookings</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      <section className="section-card">
        <h2>Bookings</h2>
        <div className="table">
          {bookings.map((b) => {
            const photographer = photographers.find((p) => p.id === b.photographerId)
            const client = clients.find((c) => c.id === b.clientId)
            const pkg = photographer?.packages.find((p) => p.id === b.packageId)
            return (
              <div key={b.id} className="table-row">
                <div className="row-main">
                  <strong>
                    {client?.name ?? 'Unknown client'} →{' '}
                    {photographer?.name ?? 'Unknown photographer'}
                  </strong>
                  <span className="muted">
                    {b.date} • {pkg?.name ?? 'Unknown package'}
                  </span>
                </div>
                <div className="row-tags">
                  <span className="pill">{b.status}</span>
                  <span className="muted">Total ${b.totalPrice}</span>
                </div>
              </div>
            )
          })}
          {bookings.length === 0 && <p className="muted">No bookings found.</p>}
        </div>
      </section>
    </div>
  )
}


