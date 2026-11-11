import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContent } from '../../shared/content/useContent'
import { images } from '../../data/images'
import { Icon } from './Icons'

export default function Projects() {
  const { t } = useTranslation('projects')
  const { content, text } = useContent()
  const [pos, setPos] = useState(52)
  const cards = t('cards', { returnObjects: true }) as { id: string; title: string; tags: string }[]
  const cardImages: Record<string, string> = {
    classic: images.projectClassic,
    lowrider: images.projectLowrider,
    engine: images.projectEngine,
    exhaust: images.projectExhaust,
    sports: images.projectSports,
  }
  const viewportRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLElement | null>>([])
  const [current, setCurrent] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: false })

  function updateCarousel() {
    const scroller = viewportRef.current
    if (!scroller) return
    let closest = 0
    let best = Number.POSITIVE_INFINITY
    cardRefs.current.forEach((card, index) => {
      if (!card) return
      const distance = Math.abs(card.offsetLeft - scroller.offsetLeft - scroller.scrollLeft)
      if (distance < best) {
        best = distance
        closest = index
      }
    })
    const start = scroller.scrollLeft <= 2
    const end = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2
    setCurrent(end ? cards.length - 1 : closest)
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }))
  }

  function scrollCards(direction: number) {
    const scroller = viewportRef.current
    if (!scroller) return
    scroller.scrollBy({ left: direction * scroller.clientWidth * 0.8, behavior: 'smooth' })
  }

  function goTo(index: number) {
    const scroller = viewportRef.current
    const card = cardRefs.current[index]
    if (!scroller || !card) return
    scroller.scrollTo({ left: card.offsetLeft - scroller.offsetLeft, behavior: 'smooth' })
  }

  useEffect(() => {
    updateCarousel()
    window.addEventListener('resize', updateCarousel)
    return () => window.removeEventListener('resize', updateCarousel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function move(clientX: number, element: HTMLElement) {
    const rect = element.getBoundingClientRect()
    const next = Math.round(((clientX - rect.left) / rect.width) * 100)
    setPos(Math.min(100, Math.max(0, next)))
  }

  return (
    <section className="projects" id="projects">
      {/*
      <div className="projects-top">
        <div className="wrap">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2>{t('title')}</h2>
          <div className="path-grid">
            {content.paths.map((path) => (
              <button
                type="button"
                className="path-card"
                key={path.id}
                onClick={() => openPath(path.serviceId)}
              >
                <img src={path.image} alt="" />
                <span className="shade" />
                <span className="path-body">
                  <span className="path-icon">
                    <Icon name={path.icon} size={20} />
                  </span>
                  <span>
                    <strong>{text(path.title)}</strong>
                    <em>{text(path.text)}</em>
                  </span>
                  <span className="path-go" aria-hidden="true">
                    <Icon name="arrow" size={16} />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      */}

      <div className="featured" id="featured">
        <div className="wrap featured-grid">
          <div>
            <p className="eyebrow">{t('featured')}</p>
            <h2>
              {t('line1')}
              <br />
              {t('line2')}
            </h2>
            <p>{t('text')}</p>
            <a className="btn" href="#projects">
              {t('view')}
              <Icon name="arrow" size={18} />
            </a>
          </div>

          <div
            className="ba"
            onPointerDown={(event) => {
              move(event.clientX, event.currentTarget)
              if (event.currentTarget.setPointerCapture) {
                event.currentTarget.setPointerCapture(event.pointerId)
              }
            }}
            onPointerMove={(event) => {
              if (event.buttons === 1) move(event.clientX, event.currentTarget)
            }}
          >
            <img src={images.after} alt={t('afterAlt')} draggable="false" />
            <div className="ba-before" style={{ width: `${pos}%` }}>
              <img src={images.before} alt={t('beforeAlt')} draggable="false" />
            </div>
            <div className="ba-line" style={{ left: `${pos}%` }}>
              <span className="ba-knob">
                <Icon name="chevronLeft" size={14} />
                <Icon name="chevronRight" size={14} />
              </span>
            </div>
            <span className="ba-tag left">{t('before')}</span>
            <span className="ba-tag right">{t('after')}</span>
            <input
              className="ba-range"
              type="range"
              min="0"
              max="100"
              value={pos}
              aria-label={t('slider')}
              onChange={(event) => setPos(Number(event.target.value))}
            />
          </div>

          <ul className="detail-list">
            {content.projectDetails.map((item) => (
              <li key={item.title.en}>
                <span>
                  <Icon name={item.icon} size={18} />
                </span>
                {text(item.title)}
              </li>
            ))}
          </ul>
        </div>

        <div className="wrap proj-gallery">
          <h3 className="proj-gallery-title">{t('galleryTitle')}</h3>
          <div className="proj-carousel">
            <button
              type="button"
              className="svc-arrow prev"
              aria-label={t('prevProject')}
              disabled={edges.start}
              onClick={() => scrollCards(-1)}
            >
              <Icon name="chevronLeft" size={20} />
            </button>
            <button
              type="button"
              className="svc-arrow next"
              aria-label={t('nextProject')}
              disabled={edges.end}
              onClick={() => scrollCards(1)}
            >
              <Icon name="chevronRight" size={20} />
            </button>
            <div className="proj-viewport" ref={viewportRef} onScroll={updateCarousel}>
              <ul className="proj-track">
                {cards.map((card, index) => (
                  <li
                    className="proj-card"
                    key={card.id}
                    ref={(node) => {
                      cardRefs.current[index] = node
                    }}
                  >
                    <img src={cardImages[card.id]} alt="" loading="lazy" />
                    <div className="proj-card-body">
                      <strong>{card.title}</strong>
                      <span>{card.tags}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="proj-dots">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                className={index === current ? 'active' : undefined}
                aria-label={t('goTo', { n: index + 1 })}
                aria-current={index === current ? 'true' : undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
