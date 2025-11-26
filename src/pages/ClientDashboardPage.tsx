import { useState } from 'react'
import { Link } from 'react-router-dom'
import { addReview, mockStore } from '../mock/mockData'
import { useAuth } from '../auth/AuthContext'
import './ClientDashboardPage.css'

export const ClientDashboardPage: React.FC = () => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null)
  const [, setVersion] = useState(0)
  const { currentUser } = useAuth()

  const client =
    currentUser?.role === 'client'
      ? mockStore.clients.find((c) => c.id === currentUser.id)
      : undefined

  const myBookings = client
    ? mockStore.bookings.filter((b) => b.clientId === client.id)
    : []

  const myReviews = client
    ? mockStore.reviews.filter((r) => r.clientId === client.id)
    : []

  const handleOpenReview = (bookingId: string) => {
    setSelectedBookingId(bookingId)
    setRating(5)
    setComment('')
  }

  const handleSubmitReview = () => {
    if (!selectedBookingId || !comment.trim() || !client) return
    const booking = mockStore.bookings.find((b) => b.id === selectedBookingId)
    if (!booking) return
    addReview({
      bookingId: booking.id,
      photographerId: booking.photographerId,
      clientId: client.id,
      rating,
      comment: comment.trim(),
    })
    setSelectedBookingId(null)
    setComment('')
    setVersion((v) => v + 1)
  }

  if (!client || !currentUser || currentUser.role !== 'client') {
    return (
      <div className="page">
        <p>Client not found or not authorized.</p>
        <Link to="/" className="btn secondary">
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="page client-dashboard">
      <section className="hero">
        <h1>Welcome, {client.name}</h1>
        <p className="muted">View and manage your bookings and reviews.</p>
      </section>

      <div className="grid-2">
        <section className="section-card">
          <h2>My bookings</h2>
          {myBookings.length === 0 && <p className="muted">No bookings yet.</p>}
          <div className="table">
            {myBookings.map((b) => {
              const photographer = mockStore.photographers.find(
                (p) => p.id === b.photographerId,
              )
              const pkg = photographer?.packages.find((p) => p.id === b.packageId)
              const alreadyReviewed = myReviews.some((r) => r.bookingId === b.id)
              return (
                <div key={b.id} className="table-row">
                  <div>
                    <div className="row-main">
                      <strong>{photographer?.name ?? 'Unknown photographer'}</strong>
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
                      Chat
                    </Link>
                    <Link to={`/payment/${b.id}`} className="btn ghost">
                      Payment
                    </Link>
                    {!alreadyReviewed && (
                      <button
                        type="button"
                        className="btn ghost"
                        onClick={() => handleOpenReview(b.id)}
                      >
                        Review
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {selectedBookingId && (
            <div className="review-inline">
              <h3>Leave a review</h3>
              <label>
                Rating
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} stars
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Comment
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
              </label>
              <div className="review-actions">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setSelectedBookingId(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn primary"
                  onClick={handleSubmitReview}
                >
                  Submit review
                </button>
              </div>
            </div>
          )}
        </section>

        <aside className="section-card">
          <h2>My reviews</h2>
          {myReviews.length === 0 && (
            <p className="muted">
              You haven&apos;t left any reviews yet. After a booking, use the Review button next
              to it.
            </p>
          )}
          {myReviews.map((r) => {
            const photographer = mockStore.photographers.find(
              (p) => p.id === r.photographerId,
            )
            return (
              <article key={r.id} className="review-card">
                <p>
                  <strong>{photographer?.name ?? 'Unknown photographer'}</strong>
                </p>
                <p>
                  ⭐ {r.rating} •{' '}
                  <span className="muted">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p>{r.comment}</p>
              </article>
            )
          })}
        </aside>
      </div>
    </div>
  )
}


