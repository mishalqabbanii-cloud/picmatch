import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { mockStore, reviews as allReviews } from '../mock/mockData'
import './PhotographerProfilePage.css'

export const PhotographerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const photographer = mockStore.photographers.find((p) => p.id === id)

  const reviews = useMemo(
    () => allReviews.filter((r) => r.photographerId === photographer?.id),
    [photographer?.id],
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

  return (
    <div className="page profile-page">
      <section className="profile-header">
        <div>
          <h1>{photographer.name}</h1>
          <p className="muted">
            {photographer.city} • {photographer.styles.join(', ')}
          </p>
          <p>
            ⭐ {photographer.rating.toFixed(1)} ({photographer.reviewCount} reviews)
          </p>
          <p>
            Price range: ${photographer.priceRange.min} - ${photographer.priceRange.max}
          </p>
        </div>
        <div className="profile-actions">
          <Link to={`/booking/${photographer.id}`} className="btn primary">
            Book a package
          </Link>
        </div>
      </section>

      <section className="profile-bio">
        <h2>About</h2>
        <p>{photographer.bio}</p>
      </section>

      <section className="profile-portfolio">
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

      <section className="profile-packages">
        <h2>Packages</h2>
        <div className="packages-grid">
          {photographer.packages.map((pkg) => (
            <article key={pkg.id} className="package-card">
              <h3>{pkg.name}</h3>
              <p className="muted">{pkg.description}</p>
              <p>
                <strong>${pkg.price}</strong> • {pkg.durationHours} hours
              </p>
              <Link to={`/booking/${photographer.id}?packageId=${pkg.id}`} className="btn secondary">
                Choose package
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-reviews">
        <h2>Reviews</h2>
        {reviews.length === 0 && <p className="muted">No reviews yet.</p>}
        {reviews.map((r) => (
          <article key={r.id} className="review-card">
            <p>
              ⭐ {r.rating} • <span className="muted">{new Date(r.createdAt).toLocaleDateString()}</span>
            </p>
            <p>{r.comment}</p>
          </article>
        ))}
      </section>
    </div>
  )
}


