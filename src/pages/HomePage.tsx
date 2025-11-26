import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { mockStore } from '../mock/mockData'
import type { Style } from '../mock/mockData'
import './HomePage.css'

type StyleFilter = Style | 'all'

export const HomePage: React.FC = () => {
  const [city, setCity] = useState('')
  const [style, setStyle] = useState<StyleFilter>('all')
  const [maxPrice, setMaxPrice] = useState<number | ''>('')

  const cities = useMemo(
    () => Array.from(new Set(mockStore.photographers.map((p) => p.city))).sort(),
    [],
  )

  const styles: StyleFilter[] = useMemo(
    () => ['all', 'wedding', 'portrait', 'event', 'fashion', 'landscape'],
    [],
  )

  const filtered = useMemo(
    () =>
      mockStore.photographers.filter((p) => {
        if (city && p.city !== city) return false
        if (style !== 'all' && !p.styles.includes(style)) return false
        if (maxPrice !== '' && p.priceRange.max > Number(maxPrice)) return false
        return true
      }),
    [city, style, maxPrice],
  )

  return (
    <div className="page home-page">
      <section className="hero home-hero">
        <div className="hero-copy">
          <h1>
            Book <span>photographers</span> for your next story
          </h1>
          <p>Search by city, style, and budget. Preview portfolios and complete your booking.</p>
          <div className="hero-stats">
            <div>
              <strong>{mockStore.photographers.length}</strong>
              <span>Photographers</span>
            </div>
            <div>
              <strong>{cities.length}</strong>
              <span>Cities</span>
            </div>
            <div>
              <strong>End‑to‑end</strong>
              <span>Booking flow</span>
            </div>
          </div>
        </div>
        <div className="hero-card">
          <p className="muted">Try a quick filter:</p>
          <div className="hero-tags">
            <button
              type="button"
              className={style === 'wedding' ? 'tag active' : 'tag'}
              onClick={() => setStyle('wedding')}
            >
              Wedding
            </button>
            <button
              type="button"
              className={style === 'portrait' ? 'tag active' : 'tag'}
              onClick={() => setStyle('portrait')}
            >
              Portrait
            </button>
            <button
              type="button"
              className={style === 'event' ? 'tag active' : 'tag'}
              onClick={() => setStyle('event')}
            >
              Events
            </button>
            <button
              type="button"
              className={style === 'all' ? 'tag active' : 'tag'}
              onClick={() => setStyle('all')}
            >
              Reset filters
            </button>
          </div>
          <p className="muted small">
            Use the controls below for more precise filters (city, style, and price range).
          </p>
        </div>
      </section>

      <section className="filters section-card">
        <div className="filter-group">
          <label>City</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Style</label>
          <select value={style} onChange={(e) => setStyle(e.target.value as StyleFilter)}>
            {styles.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? 'All styles' : s[0].toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Max price (top of range)</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Any"
            min={0}
          />
        </div>
      </section>

      <section className="photographer-list">
        {filtered.map((p) => (
          <article key={p.id} className="photographer-card">
            <div className="photographer-main">
              <h2>{p.name}</h2>
              <div className="meta-row">
                <span className="meta-city">{p.city}</span>
                <span className="meta-styles">{p.styles.join(' • ')}</span>
                <span className="meta-rating">
                  ⭐ {p.rating.toFixed(1)} · {p.reviewCount} reviews
                </span>
              </div>
              <p className="price-row">
                From <strong>${p.priceRange.min}</strong> up to{' '}
                <strong>${p.priceRange.max}</strong>
              </p>
            </div>
            <div className="photographer-actions">
              <Link to={`/photographers/${p.id}`} className="btn primary">
                View profile
              </Link>
              <Link to={`/booking/${p.id}`} className="btn secondary">
                Book now
              </Link>
            </div>
          </article>
        ))}
        {filtered.length === 0 && <p className="muted">No photographers match these filters.</p>}
      </section>
    </div>
  )
}


