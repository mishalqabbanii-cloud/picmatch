import { useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom'
import { createBooking, mockStore } from '../mock/mockData'
import './BookingFlowPage.css'

const CURRENT_CLIENT_ID = 'c1'

type Step = 'package' | 'date' | 'confirm' | 'done'

export const BookingFlowPage: React.FC = () => {
  const { photographerId } = useParams<{ photographerId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const photographer = mockStore.photographers.find((p) => p.id === photographerId)
  const initialPackageId = searchParams.get('packageId') ?? undefined

  const [step, setStep] = useState<Step>(initialPackageId ? 'date' : 'package')
  const [selectedPackageId, setSelectedPackageId] = useState<string | undefined>(initialPackageId)
  const [date, setDate] = useState('')
  const [bookingId, setBookingId] = useState<string | null>(null)

  const selectedPackage = useMemo(
    () => photographer?.packages.find((pkg) => pkg.id === selectedPackageId),
    [photographer, selectedPackageId],
  )

  if (!photographer) {
    return (
      <div className="page">
        <p>Photographer not found.</p>
        <Link to="/" className="btn secondary">
          Back to home
        </Link>
      </div>
    )
  }

  const goNext = () => {
    if (step === 'package') setStep('date')
    else if (step === 'date') setStep('confirm')
  }

  const handleConfirm = () => {
    if (!selectedPackage || !date) return
    const booking = createBooking({
      photographerId: photographer.id,
      clientId: CURRENT_CLIENT_ID,
      packageId: selectedPackage.id,
      date,
      totalPrice: selectedPackage.price,
    })
    setBookingId(booking.id)
    setStep('done')
  }

  const canContinueFromPackage = !!selectedPackageId
  const canContinueFromDate = !!date

  return (
    <div className="page booking-page">
      <section className="hero">
        <h1>Book {photographer.name}</h1>
        <p>Choose a package and preferred date to create a booking.</p>
      </section>

      <div className="grid-2 booking-layout">
        <section className="section-card booking-main">
          <ol className="stepper">
            <li className={step === 'package' ? 'active' : step === 'date' || step === 'confirm' || step === 'done' ? 'done' : ''}>
              1. Package
            </li>
            <li className={step === 'date' ? 'active' : step === 'confirm' || step === 'done' ? 'done' : ''}>
              2. Date
            </li>
            <li className={step === 'confirm' || step === 'done' ? 'active' : ''}>3. Confirm</li>
          </ol>

          {step === 'package' && (
            <div className="booking-step">
              <h2>Select a package</h2>
              <div className="packages-grid">
                {photographer.packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    className={
                      'package-option' + (selectedPackageId === pkg.id ? ' selected' : '')
                    }
                    onClick={() => setSelectedPackageId(pkg.id)}
                  >
                    <h3>{pkg.name}</h3>
                    <p className="muted">{pkg.description}</p>
                    <p>
                      <strong>${pkg.price}</strong> • {pkg.durationHours} hours
                    </p>
                  </button>
                ))}
              </div>
              <div className="booking-actions">
                <button
                  type="button"
                  className="btn primary"
                  disabled={!canContinueFromPackage}
                  onClick={goNext}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 'date' && (
            <div className="booking-step">
              <h2>Choose a date</h2>
              <p className="muted">Select a date that works for your session.</p>
              <div className="date-row">
                <label>
                  Date
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>
              </div>
              <div className="booking-actions">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setStep('package')}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn primary"
                  disabled={!canContinueFromDate}
                  onClick={goNext}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 'confirm' && selectedPackage && (
            <div className="booking-step">
              <h2>Review & confirm</h2>
              <p className="muted">Review the details below and confirm your booking.</p>
              <ul className="summary-list">
                <li>
                  <span>Photographer</span>
                  <span>{photographer.name}</span>
                </li>
                <li>
                  <span>Package</span>
                  <span>{selectedPackage.name}</span>
                </li>
                <li>
                  <span>Date</span>
                  <span>{date}</span>
                </li>
                <li>
                  <span>Total</span>
                  <span>${selectedPackage.price}</span>
                </li>
              </ul>
              <div className="booking-actions">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setStep('date')}
                >
                  Back
                </button>
                <button type="button" className="btn primary" onClick={handleConfirm}>
                  Confirm booking
                </button>
              </div>
            </div>
          )}

          {step === 'done' && bookingId && selectedPackage && (
            <div className="booking-step">
              <h2>Booking created</h2>
              <p className="muted">Your booking has been created. You can manage it from here.</p>
              <ul className="summary-list">
                <li>
                  <span>Booking ID</span>
                  <span>{bookingId}</span>
                </li>
                <li>
                  <span>Photographer</span>
                  <span>{photographer.name}</span>
                </li>
                <li>
                  <span>Package</span>
                  <span>{selectedPackage.name}</span>
                </li>
                <li>
                  <span>Date</span>
                  <span>{date}</span>
                </li>
                <li>
                  <span>Total</span>
                  <span>${selectedPackage.price}</span>
                </li>
              </ul>
              <div className="booking-actions">
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => navigate(`/payment/${bookingId}`)}
                >
                  Go to payment
                </button>
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => navigate(`/chat/${bookingId}`)}
                >
                  Open chat
                </button>
                <Link to="/dashboard/client" className="btn ghost">
                  View client dashboard
                </Link>
              </div>
            </div>
          )}
        </section>

        <aside className="section-card booking-sidebar">
          <h2>Summary</h2>
          <p className="muted">Overview of the photographer and selection you are about to book.</p>
          <ul className="summary-list compact">
            <li>
              <span>Photographer</span>
              <span>{photographer.name}</span>
            </li>
            <li>
              <span>City</span>
              <span>{photographer.city}</span>
            </li>
            <li>
              <span>Styles</span>
              <span>{photographer.styles.join(', ')}</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}


