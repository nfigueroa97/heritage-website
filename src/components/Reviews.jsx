import { useState } from 'react'
import { images, moreReviews, ratingSummary, spotlightReviews } from '../data/content'
import { Icon } from './Icons'
import Logo from './Logo'

function Stars({ count }) {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <Icon key={index} name="star" size={16} filled={index < count} />
      ))}
    </span>
  )
}

function Avatar({ src, name }) {
  const [ok, setOk] = useState(true)
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  if (!ok) return <span className="avatar fallback">{initials}</span>
  return <img className="avatar" src={src} alt="" onError={() => setOk(false)} />
}

export default function Reviews() {
  const [index, setIndex] = useState(0)
  const review = spotlightReviews[index]
  const total = spotlightReviews.length

  function step(direction) {
    setIndex((current) => (current + direction + total) % total)
  }

  return (
    <section className="reviews" id="reviews">
      <div className="wrap">
        <div className="rating-bar">
          <div className="rating-score">
            <strong>{ratingSummary.score}</strong>
            <div>
              <Stars count={5} />
              <span>{ratingSummary.count}</span>
            </div>
          </div>
          <div className="platforms">
            {ratingSummary.platforms.map((platform) => (
              <div key={platform.name}>
                <Icon name={platform.icon} size={22} />
                <div>
                  <b>{platform.name}</b>
                  <span>
                    {platform.score} <Icon name="star" size={12} filled />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="spotlight">
          <img src={images.garage} alt="" />
          <div className="spot-shade" />
          <button type="button" className="spot-nav prev" aria-label="Previous review" onClick={() => step(-1)}>
            <Icon name="chevronLeft" />
          </button>
          <article className="spot-card" aria-live="polite">
            <header>
              <div>
                <b>{review.score}</b>
                <Stars count={review.stars} />
                <span className="source">
                  <Icon name={review.icon} size={16} />
                  {review.source} Review
                </span>
              </div>
              <time>{review.date}</time>
            </header>
            <blockquote>“{review.quote}”</blockquote>
            <footer>
              <Avatar src={review.photo} name={review.name} />
              <div>
                <strong>{review.name}</strong>
                <span>{review.place}</span>
              </div>
            </footer>
          </article>
          <button type="button" className="spot-nav next" aria-label="Next review" onClick={() => step(1)}>
            <Icon name="chevronRight" />
          </button>
          <div className="dots" role="tablist" aria-label="Choose a review">
            {spotlightReviews.map((item, dot) => (
              <button
                key={item.name}
                type="button"
                className={dot === index ? 'active' : undefined}
                aria-label={`Show review from ${item.name}`}
                aria-selected={dot === index}
                onClick={() => setIndex(dot)}
              />
            ))}
          </div>
        </div>

        <h2 className="section-title">More Happy Customers</h2>
        <div className="review-grid">
          {moreReviews.map((item) => (
            <article key={item.name}>
              <header>
                <b>{item.score}</b>
                <Stars count={item.stars} />
              </header>
              <p>“{item.quote}”</p>
              <footer>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.place}</span>
                </div>
                <Icon name={item.icon} size={22} />
              </footer>
            </article>
          ))}
        </div>

        <div className="feedback">
          <div className="feedback-card">
            <span className="mv-icon">
              <Icon name="chat" />
            </span>
            <h2>Your Feedback Matters</h2>
            <p>Help us continue to deliver exceptional service by leaving a review.</p>
            <a className="btn" href="#contact">
              Leave a Review
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="thanks">
            <img src={images.desert} alt="Desert highway at sunset" />
            <div>
              <Logo />
              <p>
                Thank you
                <br />
                for your support!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
