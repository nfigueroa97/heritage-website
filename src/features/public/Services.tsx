import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { track } from '../../shared/analytics'
import { useContent } from '../../shared/content/useContent'
// import { images } from '../../data/images'
import { Icon } from './Icons'

const HIGHLIGHTS_SHOWN = 3

// Lives outside the keyed panel so it stays open while the arrows switch category.
function ServicesModal({
  open,
  onClose,
  onStep,
  items,
  name,
  image,
}: {
  open: boolean
  onClose: () => void
  onStep: (delta: number) => void
  items: string[]
  name: string
  image: string
}) {
  const { t } = useTranslation('services')
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (dialogRef.current) dialogRef.current.scrollTop = 0
  }, [name])

  return (
    <dialog
      ref={dialogRef}
      className="svc-modal"
      aria-label={t('modalTitle', { name })}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="svc-modal-head">
        <img src={image} alt="" />
        <button type="button" className="svc-modal-nav prev" aria-label={t('prev')} onClick={() => onStep(-1)}>
          <Icon name="chevronLeft" size={20} />
        </button>
        <button type="button" className="svc-modal-nav next" aria-label={t('next')} onClick={() => onStep(1)}>
          <Icon name="chevronRight" size={20} />
        </button>
        <div className="svc-modal-intro">
          <h2>{t('modalTitle', { name })}</h2>
          <p>{t('modalText', { name })}</p>
        </div>
        <button type="button" className="svc-modal-close" aria-label={t('close')} onClick={onClose}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <ul className="svc-modal-list">
        {items.map((label) => (
          <li key={label}>
            <Icon name="check" size={18} />
            {label}
          </li>
        ))}
      </ul>
      <div className="svc-modal-foot">
        <a className="svc-modal-fin" href="#financing" onClick={onClose}>
          <Icon name="check" size={20} />
          {t('financingAvailable')}
        </a>
        <span>{t('modalHelp')}</span>
        <a className="btn" href="#contact-form" onClick={onClose}>
          {t('quote')}
          <Icon name="arrow" size={18} />
        </a>
      </div>
    </dialog>
  )
}

export default function Services({
  activeId,
  onSelect,
}: {
  activeId: string
  onSelect: (id: string) => void
}) {
  const { t } = useTranslation('services')
  const { content, text } = useContent()
  const active = content.services.find((service) => service.id === activeId) ?? content.services[0]
  const shopLabels = content.shopServices
    .filter((item) => item.serviceId === active.id)
    .map((item) => item.label)
  const clean = (label: string) => label.toLowerCase().replace(/[^a-z0-9]/g, '')
  // Generic items already covered by a shop service (e.g. "Oil Change") are listed once.
  const offered = [
    ...active.included
      .map((item) => text(item))
      .filter((label) => !shopLabels.some((shop) => clean(shop).includes(clean(label)))),
    ...shopLabels,
  ]
  const viewportRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLElement | null>>([])
  const fromScroll = useRef(false)
  const [edges, setEdges] = useState({ start: true, end: false })
  const [modalOpen, setModalOpen] = useState(false)
  const touchX = useRef<number | null>(null)

  function updateEdges() {
    const scroller = viewportRef.current
    if (!scroller) return
    const start = scroller.scrollLeft <= 2
    const end = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }))
  }

  function scrollCards(direction: number) {
    const scroller = viewportRef.current
    if (!scroller) return
    scroller.scrollBy({ left: direction * scroller.clientWidth * 0.8, behavior: 'smooth' })
  }

  useEffect(() => {
    updateEdges()
    window.addEventListener('resize', updateEdges)
    return () => window.removeEventListener('resize', updateEdges)
  }, [])

  function scrollToService(id: string, behavior: ScrollBehavior = 'smooth') {
    const scroller = viewportRef.current
    const index = content.services.findIndex((service) => service.id === id)
    const card = cardRefs.current[index]
    if (!scroller || !card) return
    const mobile = window.matchMedia('(max-width: 1040px)').matches
    const left = mobile
      ? card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2
      : Math.max(0, card.offsetLeft - 16)
    scroller.scrollTo({ left, behavior })
  }

  useLayoutEffect(() => {
    if (fromScroll.current) {
      fromScroll.current = false
      return
    }
    scrollToService(active.id, 'auto')
    function onResize() {
      scrollToService(active.id, 'auto')
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active.id, content.services])

  function onCarouselScroll() {
    updateEdges()
    const scroller = viewportRef.current
    if (!scroller || !window.matchMedia('(max-width: 1040px)').matches) return
    const mid = scroller.scrollLeft + scroller.clientWidth / 2
    let closest = 0
    let best = Number.POSITIVE_INFINITY
    cardRefs.current.forEach((card, index) => {
      if (!card) return
      const center = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(center - mid)
      if (distance < best) {
        best = distance
        closest = index
      }
    })
    const next = content.services[closest]
    if (!next || next.id === active.id) return
    fromScroll.current = true
    onSelect(next.id)
  }

  function openService(id: string) {
    onSelect(id)
    track('service_tab', { id })
    scrollToService(id)
  }

  function stepModal(delta: number) {
    const index = content.services.findIndex((service) => service.id === active.id)
    const next = content.services[(index + delta + content.services.length) % content.services.length]
    if (!next) return
    onSelect(next.id)
    track('service_tab', { id: next.id })
  }

  function step(delta: number) {
    const index = content.services.findIndex((service) => service.id === active.id)
    const next = content.services[(index + delta + content.services.length) % content.services.length]
    if (next) openService(next.id)
  }

  return (
    <section className="services" id="services">
      <div className="wrap">
        {/* <div className="tabs" role="tablist" aria-label={t('tabs')}>
          {content.services.map((service) => (
            <button
              key={service.id}
              type="button"
              role="tab"
              id={`tab-${service.id}`}
              aria-selected={service.id === active.id}
              aria-controls="service-panel"
              className={service.id === active.id ? 'active' : undefined}
              onClick={() => {
                onSelect(service.id)
                track('service_tab', { id: service.id })
              }}
            >
              <Icon name={service.icon} size={26} />
              {text(service.tab)}
            </button>
          ))}
        </div> */}

        <div
          className="svc-panel"
          id="service-panel"
          role="region"
          aria-label={text(active.tab)}
          key={active.id}
        >
          <div
            className="svc-hero"
            onTouchStart={(event) => {
              touchX.current = event.touches[0].clientX
            }}
            onTouchEnd={(event) => {
              if (touchX.current === null) return
              const dx = event.changedTouches[0].clientX - touchX.current
              touchX.current = null
              if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1)
            }}
          >
            <img className="svc-hero-img" src={active.image} alt={t('alt', { name: text(active.title) })} />
            <button type="button" className="svc-arrow prev" aria-label={t('prev')} onClick={() => step(-1)}>
              <Icon name="chevronLeft" size={20} />
            </button>
            <button type="button" className="svc-arrow next" aria-label={t('next')} onClick={() => step(1)}>
              <Icon name="chevronRight" size={20} />
            </button>
            <div className="svc-dots svc-hero-dots">
              {content.services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  className={service.id === active.id ? 'active' : undefined}
                  aria-label={text(service.tab)}
                  aria-current={service.id === active.id ? 'true' : undefined}
                  onClick={() => openService(service.id)}
                />
              ))}
            </div>
            <div className="svc-hero-copy">
              <h2 className="svc-eyebrow">{t('title')}</h2>
              <h3 className="svc-hero-title">{text(active.tab)}</h3>
              <p className="svc-hero-text">{text(active.description)}</p>
              <div className="svc-hero-actions">
                <a className="btn" href="#contact-form" onClick={() => track('quote_click', { id: active.id })}>
                  {t('quote')}
                  <Icon name="arrow" size={18} />
                </a>
                <a className="btn-outline" href={content.site.phoneHref} onClick={() => track('phone_click')}>
                  <Icon name="phone" size={18} />
                  {t('contact')}
                </a>
              </div>
            </div>
          </div>

          <div className="included">
            <div className="included-head">
              <h3>{t('included')}</h3>
              <button type="button" className="included-viewall" onClick={() => setModalOpen(true)}>
                {t('viewAllLink')}
                <Icon name="arrow" size={18} />
              </button>
            </div>
            <ul className="svc-highlights">
              {(active.highlights ?? []).slice(0, HIGHLIGHTS_SHOWN).map((item) => (
                <li key={item.title.en}>
                  <span className="svc-highlight-icon">
                    <Icon name={item.icon} size={30} />
                  </span>
                  <div>
                    <strong>{text(item.title)}</strong>
                    <p>{text(item.text)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="included-foot">
              <a className="included-fin" href="#financing">
                <Icon name="coins" size={30} />
                <span>{t('financingLine')}</span>
              </a>
              <p className="included-note">{t('note')}</p>
            </div>
          </div>
        </div>

        <ServicesModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onStep={stepModal}
          items={offered}
          name={text(active.tab)}
          image={active.image}
        />

        <div id="service-cards">
          <h2 className="section-title">{t('more')}</h2>
          <div className="svc-carousel">
            <button
              type="button"
              className="svc-arrow prev"
              aria-label={t('prev')}
              disabled={edges.start}
              onClick={() => scrollCards(-1)}
            >
              <Icon name="chevronLeft" size={20} />
            </button>
            <button
              type="button"
              className="svc-arrow next"
              aria-label={t('next')}
              disabled={edges.end}
              onClick={() => scrollCards(1)}
            >
              <Icon name="chevronRight" size={20} />
            </button>
            <div className="svc-viewport" ref={viewportRef} onScroll={onCarouselScroll}>
              <div className="card-grid">
                {content.services.map((service, index) => (
                  <article
                    className={`svc-card${service.id === active.id ? ' is-active' : ''}`}
                    key={service.id}
                    id={service.id === 'fleet' ? 'fleet' : undefined}
                    ref={(node) => {
                      cardRefs.current[index] = node
                    }}
                    onClick={() => openService(service.id)}
                  >
                    <img src={service.image} alt="" />
                    <div>
                      <h3>{text(service.cardTitle)}</h3>
                      <p>{text(service.blurb)}</p>
                      <a
                        className="svc-quote"
                        href="#contact-form"
                        onClick={(event) => {
                          event.stopPropagation()
                          track('quote_click', { id: service.id })
                        }}
                      >
                        {t('quote')}
                        <Icon name="arrow" size={16} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
