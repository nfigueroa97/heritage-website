import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { images } from '../../data/images'
import { useContent } from '../../shared/content/useContent'
import { Icon } from './Icons'

function Stars({ count, size = 16 }: { count: number; size?: number }) {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < count ? 'on' : 'off'}>
          <Icon name="star" size={size} filled={index < count} />
        </span>
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

  if (!src || !ok) return <span className="avatar fallback">{initials}</span>
  return <img className="avatar" src={src} alt="" onError={() => setOk(false)} />
}

function usePerPage() {
  const [perPage, setPerPage] = useState(1)
  useEffect(() => {
    const onResize = () => setPerPage(1)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return perPage
}

function InstagramPost() {
  return (
    <div className="ig-bar" aria-hidden="true">
      <span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#e10600">
          <path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3 5.5 6.2 5.5c1.9 0 3.3 1 3.8 2.2.5-1.2 1.9-2.2 3.8-2.2 3.2 0 5 3.1 3.7 6.3C19.5 16.4 12 21 12 21z" />
        </svg>
        <Icon name="chat" size={18} />
        <Icon name="arrow" size={18} />
      </span>
      <Icon name="tag" size={18} />
    </div>
  )
}

export default function Reviews() {
  const { t } = useTranslation('reviews')
  const { content, text } = useContent()
  const visible = content.reviews.filter((item) => item.visible)
  const items = [
    ...visible.filter((item) => item.featured),
    ...visible.filter((item) => !item.featured),
  ]
  const perPage = usePerPage()
  const [page, setPage] = useState(0)
  const pages = Math.max(Math.ceil(items.length / perPage), 1)
  const current = page % pages
  const columns = Math.min(perPage, items.length)
  const slides = Array.from({ length: pages }, (_, p) =>
    Array.from({ length: columns }, (_, i) => items[(p * perPage + i) % items.length]),
  )
  const google = content.ratingSummary.platforms.find((platform) => platform.name === 'Google')

  function step(direction: number) {
    setPage((value) => (value % pages + direction + pages) % pages)
  }

  if (!items.length) return null

  return (
    <section className="reviews" id="reviews">
      <div className="wrap rev-layout">
        <div className="rev-main">
          <div className="rev-head">
            <div className="rev-intro">
              <p className="rev-eyebrow">{t('eyebrow')}</p>
              <h2 className="rev-title">
                {/* <span className="only-d">
                  {t('title1')}
                  <br />
                  {t('title2a')} <em>{t('title2b')}</em>
                </span> */}
                <span className="only-m">
                  {t('mobA')} <em>{t('mobB')}</em>
                </span>
              </h2>
              <span className="rev-rule" />
              <div className="rev-google-brand">
                <Icon name="google" size={52} />
                <div>
                  <b>Google</b>
                  <span>Customer Reviews</span>
                </div>
              </div>
            </div>
            <div className="rev-google">
              <div className="rev-google-score">
                <strong>{google?.score ?? content.ratingSummary.score}</strong>
                <div>
                  <Stars count={5} size={20} />
                  <span>{text(content.ratingSummary.count)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rev-carousel">
            <button type="button" className="rev-nav prev" aria-label={t('prev')} onClick={() => step(-1)}>
              <Icon name="chevronLeft" size={20} />
            </button>
            <div className="rev-stage" aria-live="polite">
              {slides.map((slide, p) => (
                <div
                  key={p}
                  className={`rev-cards per-${columns}${p === current ? ' active' : ''}`}
                  aria-hidden={p !== current}
                >
                  {slide.map((item, i) => (
                    <article key={`${item.id}-${i}`} className="rev-card">
                      <header>
                        <span className="quote-mark" aria-hidden="true">“</span>
                        <Stars count={item.stars} size={18} />
                      </header>
                      <blockquote className="text-justify">{text(item.quote)}</blockquote>
                      <footer>
                        <Avatar src={item.photo} name={item.name} />
                        <strong>{item.name}</strong>
                        <Icon name={item.icon} size={24} />
                      </footer>
                    </article>
                  ))}
                </div>
              ))}
            </div>
            <button type="button" className="rev-nav next" aria-label={t('next')} onClick={() => step(1)}>
              <Icon name="chevronRight" size={20} />
            </button>
          </div>

          <div className="dots" role="tablist" aria-label={t('choose')}>
            {Array.from({ length: pages }, (_, dot) => (
              <button
                key={dot}
                type="button"
                className={dot === current ? 'active' : undefined}
                aria-label={t('page', { n: dot + 1 })}
                aria-selected={dot === current}
                onClick={() => setPage(dot)}
              />
            ))}
          </div>

          <div className="rev-actions">
            {/* <a className="btn-outline" href={content.site.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
              {t('seeAll')}
              <Icon name="external" size={18} />
            </a> */}
            <a className="btn-outline g-btn" href={content.site.googleReviewUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="google" size={24} />
              {t('leaveGoogle')}
            </a>
          </div>
        </div>

        <aside className="promo">
          {/* <p className="rev-eyebrow">{t('promoEyebrow')}</p> */}
          <h3>
            <span className="only-d">{t('promoTitle')}</span>
            <span className="only-m">{t('promoTitleMob')}</span>
          </h3>
          <span className="rev-rule" />
          <p className="promo-text">
            <span className="only-d">{t('promoText')}</span>
            <span className="only-m">{t('promoTextMob')}</span>
          </p>
          <div className="promo-photos" aria-hidden="true">
            <img className="left" src={images.brakesImage} alt="" />
            <div className="center">
              <img src={images.performanceImage} alt="" />
              <InstagramPost />
            </div>
            <img className="right" src={images.diagnosticsImage} alt="" />
          </div>
          <a className="btn-solid" href={content.site.instagramUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="instagram" size={26} />
            {t('promoCta')}
            <Icon name="arrow" size={18} />
          </a>
        </aside>
      </div>
    </section>
  )
}
