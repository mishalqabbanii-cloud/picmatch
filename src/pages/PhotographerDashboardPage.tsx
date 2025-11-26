import { Link } from 'react-router-dom'
import { mockStore } from '../mock/mockData'
import { useAuth } from '../auth/AuthContext'
import './PhotographerDashboardPage.css'

export const PhotographerDashboardPage: React.FC = () => {
  const { currentUser } = useAuth()
  const photographer =
    currentUser?.role === 'photographer'
      ? mockStore.photographers.find((p) => p.id === currentUser.id)
      : undefined

  if (!photographer || !currentUser || currentUser.role !== 'photographer') {
    return (
      <div className="page">
        <p>Photographer not found or not authorized.</p>
        <Link to="/" className="btn secondary">
          Back to home
        </Link>
      </div>
    )
  }

  const myBookings = mockStore.bookings.filter(
    (b) => b.photographerId === photographer.id,
  )

  const myReviews = mockStore.reviews.filter(
    (r) => r.photographerId === photographer.id,
  )

  return (
    <div className="page photographer-dashboard">
      <section className="hero">
        <h1>{photographer.name}</h1>
        <p className="muted">
          Manage your portfolio, packages, availability, and bookings.
        </p>
      </section>

      <div className="grid-2">
        <section className="section-card">
          <h2>Overview</h2>
          <div className="stats-row">
            <div className="stat-card">
              <span className="label">Bookings</span>
              <span className="value">{myBookings.length}</span>
            </div>
            <div className="stat-card">
              <span className="label">Rating</span>
              <span className="value">
                {photographer.rating.toFixed(1)}{' '}
                <span className="muted">({photographer.reviewCount})</span>
              </span>
            </div>
          </div>

          <h3>Availability</h3>
          <p className="muted">
            Availability dates currently configured for this profile.
          </p>
          <div className="availability-row">
            {(photographer.availability ?? []).map((d) => (
              <span key={d} className="pill">
                {d}
              </span>
            ))}
            {(!photographer.availability || photographer.availability.length === 0) && (
              <span className="muted">No availability dates configured.</span>
            )}
          </div>
        </section>

        <section className="section-card">
          <h2>Recent reviews</h2>
          {myReviews.length === 0 && <p className="muted">No reviews yet.</p>}
          {myReviews.map((r) => {
            const client = mockStore.clients.find((c) => c.id === r.clientId)
            return (
              <article key={r.id} className="review-card">
                <p>
                  ⭐ {r.rating} •{' '}
                  <span className="muted">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p className="muted">From {client?.name ?? 'Unknown client'}</p>
                <p>{r.comment}</p>
              </article>
            )
          })}
        </section>
      </div>

      <div className="grid-2">
        <section className="section-card">
          <h2>Portfolio</h2>
          <div className="portfolio-grid">
            {photographer.portfolio.map((item) => (
              <figure key={item.id} className="portfolio-item">
                <img src={item.url} alt={item.title} />
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section-card">
          <h2>Packages</h2>
          <div className="packages-grid">
            {photographer.packages.map((pkg) => (
              <article key={pkg.id} className="package-card">
                <h3>{pkg.name}</h3>
                <p className="muted">{pkg.description}</p>
                <p>
                  <strong>${pkg.price}</strong> • {pkg.durationHours} hours
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="section-card">
        <h2>Bookings</h2>
        {myBookings.length === 0 && <p className="muted">No bookings yet.</p>}
        <div className="table">
          {myBookings.map((b) => {
            const client = mockStore.clients.find((c) => c.id === b.clientId)
            const pkg = photographer.packages.find((p) => p.id === b.packageId)
            return (
              <div key={b.id} className="table-row">
                <div>
                  <div className="row-main">
                    <strong>{client?.name ?? 'Unknown client'}</strong>
                    <span className="muted">
                      {b.date} • {pkg?.name ?? 'Unknown package'}
                    </span>
                  </div>
                  <div className="row-tags">
                    <span className="pill">{b.status}</span>
                    <span className="muted">Total ${b.totalPrice}</span>
                  </div>
                </div>
                <div className="row-actions">
                  <Link to={`/chat/${b.id}`} className="btn secondary">
                    Open chat
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}


