import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { track } from '../../shared/analytics'
import { useContent } from '../../shared/content/useContent'
import { images } from '../../data/images'
import { Icon } from './Icons'

const cardIds = ['mission', 'values', 'vision'] as const

export default function About() {
  const { t } = useTranslation('about')
  const { content, text } = useContent()
  const [active, setActive] = useState(1)
  const viewportRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLElement | null>>([])
  const activeRef = useRef(active)
  useEffect(() => {
    activeRef.current = active
  }, [active])

  function scrollToCard(index: number, behavior: ScrollBehavior = 'smooth') {
    if (!window.matchMedia('(max-width: 1040px)').matches) return
    const scroller = viewportRef.current
    const card = cardRefs.current[index]
    if (!scroller || !card) return
    const left = card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2
    scroller.scrollTo({ left, behavior })
  }

  useLayoutEffect(() => {
    scrollToCard(1, 'auto')
    function onResize() {
      scrollToCard(activeRef.current, 'auto')
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function onScroll() {
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
    setActive(closest)
  }

  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about-intro">
          <img className="about-intro-photo" src={images.mechanic} alt={t('photo')} />
          <div className="about-intro-shade" aria-hidden="true" />
          <div className="about-intro-copy">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2>
              {t('line1')}
              <br />
              {t('line2')}
              <br />
              <span>{t('line3')}</span>
            </h2>
            <p className="lede">{t('lede')}</p>
            <a className="btn" href="#contact" onClick={() => track('schedule_click')}>
              {t('cta')}
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <p className="script-note brush">
            {t('brush1')}
            <br />
            {t('brush2')}
            <br />
            {t('brush3')}
          </p>
        </div>

        <div className="about-cards">
          <div className="about-viewport" ref={viewportRef} onScroll={onScroll}>
            <div className="about-track">
              <article
                className={`about-card mission${active === 0 ? ' is-active' : ''}`}
                ref={(node) => {
                  cardRefs.current[0] = node
                }}
              >
                <div className="mv-icon">
                  <Icon name="sun" size={20} />
                </div>
                <h3>
                  <span className="card-title-full">{t('missionTitle')}</span>
                  <span className="card-title-short">{t('missionShort')}</span>
                </h3>
                <p>{t('mission')}</p>
              </article>
              <article
                className={`about-card values${active === 1 ? ' is-active' : ''}`}
                ref={(node) => {
                  cardRefs.current[1] = node
                }}
              >
                <div className="mv-icon">
                  <Icon name="shield" size={20} />
                </div>
                <h3>
                  <span className="card-title-full">{t('values')}</span>
                  <span className="card-title-short">{t('valuesShort')}</span>
                </h3>
                <ul className="values">
                  {content.values.map((value) => (
                    <li key={value.en}>
                      <Icon name="check" size={18} />
                      <span>{text(value)}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article
                className={`about-card vision${active === 2 ? ' is-active' : ''}`}
                ref={(node) => {
                  cardRefs.current[2] = node
                }}
              >
                <div className="mv-icon">
                  <Icon name="eye" size={20} />
                </div>
                <h3>
                  <span className="card-title-full">{t('visionTitle')}</span>
                  <span className="card-title-short">{t('visionShort')}</span>
                </h3>
                <p>{t('vision')}</p>
              </article>
            </div>
          </div>
          <div className="about-dots">
            {cardIds.map((id, index) => (
              <button
                key={id}
                type="button"
                className={active === index ? 'active' : undefined}
                aria-label={t(id === 'mission' ? 'missionShort' : id === 'vision' ? 'visionShort' : 'valuesShort')}
                onClick={() => {
                  setActive(index)
                  scrollToCard(index)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
