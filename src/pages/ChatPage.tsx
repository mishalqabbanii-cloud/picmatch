import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addMessage, mockStore } from '../mock/mockData'
import './ChatPage.css'

export const ChatPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>()
  const [draft, setDraft] = useState('')
  const [asPhotographer, setAsPhotographer] = useState(false)
  const [, setVersion] = useState(0) // force re-render after adding messages

  const booking = mockStore.bookings.find((b) => b.id === bookingId)
  const photographer = booking
    ? mockStore.photographers.find((p) => p.id === booking.photographerId)
    : undefined
  const client = booking
    ? mockStore.clients.find((c) => c.id === booking.clientId)
    : undefined

  const thread = mockStore.messages
    .filter((m) => m.bookingId === bookingId)
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp))

  if (!booking || !photographer || !client) {
    return (
      <div className="page">
        <p>Chat not available. Booking not found.</p>
        <Link to="/dashboard/client" className="btn secondary">
          Back to dashboard
        </Link>
      </div>
    )
  }

  const handleSend = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    addMessage({
      bookingId: booking.id,
      from: asPhotographer ? 'photographer' : 'client',
      content: trimmed,
    })
    setDraft('')
    setVersion((v) => v + 1)
  }

  return (
    <div className="page chat-page">
      <section className="hero">
        <h1>Chat</h1>
        <p className="muted">
          Conversation between <strong>{client.name}</strong> and{' '}
          <strong>{photographer.name}</strong>.
        </p>
      </section>

      <div className="section-card chat-wrapper">
        <header className="chat-header">
          <div>
            <div className="pill">Booking {booking.id}</div>
            <p className="muted">
              {booking.date} • {photographer.name}
            </p>
          </div>
          <div className="chat-header-actions">
            <Link to="/dashboard/client" className="btn ghost">
              Client dashboard
            </Link>
          </div>
        </header>

        <div className="chat-thread">
          {thread.map((m) => (
            <div
              key={m.id}
              className={
                'chat-message ' +
                (m.from === 'client' ? 'from-client' : 'from-photographer')
              }
            >
              <div className="chat-meta">
                <span className="sender">
                  {m.from === 'client' ? client.name : photographer.name}
                </span>
                <span className="time">
                  {new Date(m.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="chat-bubble">{m.content}</div>
            </div>
          ))}
          {thread.length === 0 && (
            <p className="muted">No messages yet. Send the first one below.</p>
          )}
        </div>

        <footer className="chat-input-row">
          <button
            type="button"
            className="btn ghost role-toggle"
            onClick={() => setAsPhotographer((v) => !v)}
          >
            Sending as:{' '}
            {asPhotographer ? photographer.name : `${client.name} (client)`}
          </button>
          <div className="chat-input-main">
            <input
              type="text"
              placeholder="Type a message..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            <button type="button" className="btn primary" onClick={handleSend}>
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}


