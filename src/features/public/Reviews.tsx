import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { images } from '../../data/images'
import { useContent } from '../../shared/content/useContent'
import { Icon } from './Icons'
import Logo from './Logo'

function Stars({ count }: { count: number }) {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <Icon key={index} name="star" size={16} filled={index < count} />
      ))}
    </span>
  )
}

function Avatar({ src, name }: { src: string; name: string }) {
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
  const { t } = useTranslation('reviews')
  const { content, text } = useContent()
  const spotlight = content.reviews.filter((item) => item.visible && item.spotlight)
  const featured = spotlight.filter((item) => item.featured)
  const ordered = [...featured, ...spotlight.filter((item) => !item.featured)]
  const more = content.reviews.filter((item) => item.visible && !item.spotlight)
  const [index, setIndex] = useState(0)
  const total = Math.max(ordered.length, 1)
  const review = ordered[index % total] ?? ordered[0]

  function step(direction: number) {
    setIndex((current) => (current + direction + total) % total)
  }

  if (!review) return null

  return (
    <section className="reviews" id="reviews">
      <div className="wrap">
        <div className="rating-bar">
          <div className="rating-score">
            <strong>{content.ratingSummary.score}</strong>
            <div>
              <Stars count={5} />
              <span>{text(content.ratingSummary.count)}</span>
            </div>
          </div>
          <div className="platforms">
            {content.ratingSummary.platforms.map((platform) => (
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
          <button type="button" className="spot-nav prev" aria-label={t('prev')} onClick={() => step(-1)}>
            <Icon name="chevronLeft" />
          </button>
          <article className="spot-card" aria-live="polite">
            <header>
              <div>
                <b>{review.score}</b>
                <Stars count={review.stars} />
                <span className="source">
                  <Icon name={review.icon} size={16} />
                  {t('source', { source: review.source })}
                </span>
              </div>
              <time>{review.date}</time>
            </header>
            <blockquote>“{text(review.quote)}”</blockquote>
            <footer>
              <Avatar src={review.photo} name={review.name} />
              <div>
                <strong>{review.name}</strong>
                <span>{review.place}</span>
              </div>
            </footer>
          </article>
          <button type="button" className="spot-nav next" aria-label={t('next')} onClick={() => step(1)}>
            <Icon name="chevronRight" />
          </button>
          <div className="dots" role="tablist" aria-label={t('choose')}>
            {ordered.map((item, dot) => (
              <button
                key={item.id}
                type="button"
                className={dot === index % total ? 'active' : undefined}
                aria-label={t('show', { name: item.name })}
                aria-selected={dot === index % total}
                onClick={() => setIndex(dot)}
              />
            ))}
          </div>
        </div>

        <h2 className="section-title">{t('more')}</h2>
        <div className="review-grid">
          {more.map((item) => (
            <article key={item.id}>
              <header>
                <b>{item.score}</b>
                <Stars count={item.stars} />
              </header>
              <p>“{text(item.quote)}”</p>
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
            <h2>{t('feedback')}</h2>
            <p>{t('feedbackText')}</p>
            <a className="btn" href="#contact">
              {t('leave')}
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="thanks">
            <img src={images.desert} alt={t('desert')} />
            <div>
              <Logo />
              <p className="script-note brush">
                {t('thanks1')}
                <br />
                {t('thanks2')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
