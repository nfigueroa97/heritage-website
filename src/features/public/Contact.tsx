import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { track } from '../../shared/analytics'
import { useContent } from '../../shared/content/useContent'
import { EmbedBoundary } from '../../shared/embeds/EmbedBoundary'
import { Icon } from './Icons'
import MapView from './MapView'

const SCHEDULER_SRC =
  'https://app.shopmonkey.cloud/scripts/scheduler.js?lid=e6448f5e-15b5-4e0b-be3c-64610d7158d8&e=stable&embed=true'

const stepIcons = ['wrench', 'calendar', 'car']

function ShopMonkeyScheduler() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: '240px' },
    )
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const host = hostRef.current
    if (!host || !near) return
    const script = document.createElement('script')
    script.src = SCHEDULER_SRC
    script.id = 'sm_w_scheduler'
    script.defer = true
    host.appendChild(script)
    return () => {
      script.remove()
      document.getElementById('sm_w_scheduler_iframe')?.remove()
    }
  }, [near])

  return <div className="scheduler-host" ref={hostRef} />
}

export default function Contact() {
  const { t } = useTranslation('contact')
  const { content, text } = useContent()
  const hours = content.site.hours[0]
  const steps = t('steps', { returnObjects: true }) as { title: string; text: string }[]

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="methods">
          <div>
            <Icon name="phone" size={28} />
            <h2>{t('call')}</h2>
            <a href={content.site.phoneHref} onClick={() => track('phone_click')}>
              {content.site.phone}
            </a>
            <p>{t('hoursNote', { days: text(hours.days), time: text(hours.time) })}</p>
          </div>
          <div>
            <Icon name="pin" size={28} />
            <h2>{t('visit')}</h2>
            <p>
              {text(content.site.street)}
              <br />
              {text(content.site.city)}
            </p>
          </div>
          <div>
            <Icon name="mail" size={28} />
            <h2>{t('email')}</h2>
            <a href={content.site.emailHref}>{content.site.email}</a>
            <p>{t('emailNote')}</p>
          </div>
        </div>

        <div className="booking">
          <div className="booking-aside">
            <p className="eyebrow">{t('book')}</p>
            <h2>{t('title')}</h2>
            <p>{t('text')}</p>
            <ul className="steps">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span>
                    <Icon name={stepIcons[index] ?? 'wrench'} size={18} />
                  </span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="aside-script brush">
              {t('brush1')}
              <br />
              {t('brush2')}
            </p>
          </div>

          <div className="form-panel">
            <EmbedBoundary fallback={<p className="scheduler-fallback">{t('scheduler')}</p>}>
              <ShopMonkeyScheduler />
            </EmbedBoundary>
          </div>
        </div>

        <div className="location">
          <div>
            <Icon name="pin" size={28} />
            <h2>{t('location')}</h2>
            <p>
              {text(content.site.street)}
              <br />
              {text(content.site.city)}
            </p>
            <a
              className="btn btn-ghost"
              href={content.site.directions}
              target="_blank"
              rel="noreferrer"
              onClick={() => track('directions_click')}
            >
              {t('directions')}
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="map-frame">
            <MapView />
          </div>
        </div>
      </div>
    </section>
  )
}
