import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addPayment, mockStore } from '../mock/mockData'
import './PaymentMockPage.css'

type ViewState = 'idle' | 'success' | 'failure'

export const PaymentMockPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>()
  const [view, setView] = useState<ViewState>('idle')

  const booking = mockStore.bookings.find((b) => b.id === bookingId)
  const photographer = booking
    ? mockStore.photographers.find((p) => p.id === booking.photographerId)
    : undefined

  if (!booking || !photographer) {
    return (
      <div className="page">
        <p>Booking not found.</p>
        <Link to="/dashboard/client" className="btn secondary">
          Back to dashboard
        </Link>
      </div>
    )
  }

  const handlePay = (status: 'success' | 'failure') => {
    addPayment({
      bookingId: booking.id,
      status,
      amount: booking.totalPrice,
    })
    setView(status)
  }

  return (
    <div className="page payment-page">
      <section className="hero">
        <h1>Payment</h1>
        <p className="muted">Review your booking details and confirm payment.</p>
      </section>

      <div className="grid-2">
        <section className="section-card">
          <h2>Booking summary</h2>
          <ul className="summary-list">
            <li>
              <span>Booking ID</span>
              <span>{booking.id}</span>
            </li>
            <li>
              <span>Photographer</span>
              <span>{photographer.name}</span>
            </li>
            <li>
              <span>Date</span>
              <span>{booking.date}</span>
            </li>
            <li>
              <span>Status</span>
              <span className="pill">{booking.status}</span>
            </li>
            <li>
              <span>Total</span>
              <span>${booking.totalPrice}</span>
            </li>
          </ul>

          <div className="mock-form">
            <label>
              Card number
              <input type="text" placeholder="4242 4242 4242 4242" />
            </label>
            <div className="mock-form-row">
              <label>
                Expiry
                <input type="text" placeholder="12/34" />
              </label>
              <label>
                CVC
                <input type="text" placeholder="123" />
              </label>
            </div>
          </div>

          <div className="payment-actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => handlePay('success')}
            >
              Simulate successful payment
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => handlePay('failure')}
            >
              Simulate failed payment
            </button>
          </div>
        </section>

        <aside className="section-card">
          {view === 'idle' && (
            <>
              <h2>What this does</h2>
              <p className="muted">
                When you click one of the buttons, the app will record a payment entry and, on
                success, mark the booking as confirmed.
              </p>
            </>
          )}
          {view === 'success' && (
            <div className="status success">
              <h2>Payment successful</h2>
              <p>Your booking is now marked as confirmed.</p>
              <div className="status-actions">
                <Link to="/dashboard/client" className="btn primary">
                  Go to client dashboard
                </Link>
                <Link to={`/chat/${booking.id}`} className="btn secondary">
                  Open chat
                </Link>
              </div>
            </div>
          )}
          {view === 'failure' && (
            <div className="status failure">
              <h2>Payment failed</h2>
              <p>No changes were saved; the booking stays in its previous status.</p>
              <div className="status-actions">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setView('idle')}
                >
                  Try again
                </button>
                <Link to="/dashboard/client" className="btn ghost">
                  Back to dashboard
                </Link>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}


