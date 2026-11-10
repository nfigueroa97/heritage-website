import { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { track } from '../../shared/analytics'
import { useContent } from '../../shared/content/useContent'
// import { images } from '../../data/images'
import { Icon } from './Icons'

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

  function step(delta: number) {
    const index = content.services.findIndex((service) => service.id === active.id)
    const next = content.services[(index + delta + content.services.length) % content.services.length]
    if (next) openService(next.id)
  }

  return (
    <section className="services" id="services">
      <div className="wrap">
        <h2 className="section-title services-title">{t('title')}</h2>
        <div className="tabs" role="tablist" aria-label={t('tabs')}>
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
        </div>

        <div
          className="feature"
          id="service-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          key={active.id}
        >
          <button type="button" className="svc-arrow prev" aria-label={t('prev')} onClick={() => step(-1)}>
            <Icon name="chevronLeft" size={20} />
          </button>
          <button type="button" className="svc-arrow next" aria-label={t('next')} onClick={() => step(1)}>
            <Icon name="chevronRight" size={20} />
          </button>
          <div className="feature-copy">
            <h2>{text(active.tab)}</h2>
            <p className="kicker">{text(active.kicker)}</p>
            <p>{text(active.description)}</p>
            <a className="btn" href="#contact-form" onClick={() => track('quote_click', { id: active.id })}>
              {t('quote')}
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="feature-visual">
            <img src={active.image} alt={t('alt', { name: text(active.title) })} />
            <div className="included">
              <h3>{t('included')}</h3>
              <ul>
                {offered.map((label) => (
                  <li key={label}>
                    <Icon name="check" size={16} />
                    {label}
                  </li>
                ))}
              </ul>
              <p className="included-note">{t('note')}</p>
            </div>
          </div>
        </div>

        <div id="service-cards">
          <h2 className="section-title">{t('more')}</h2>
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
          <div className="svc-dots">
            {content.services.map((service) => (
              <button
                key={service.id}
                type="button"
                className={service.id === active.id ? 'active' : undefined}
                aria-label={text(service.tab)}
                onClick={() => openService(service.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
