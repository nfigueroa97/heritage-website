import { useTranslation } from 'react-i18next'
import { track } from '../../shared/analytics'
import { useContent } from '../../shared/content/useContent'
import { images } from '../../data/images'
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

  function openService(id: string) {
    onSelect(id)
    track('service_tab', { id })
    const target = id === 'fleet' ? 'fleet' : 'services'
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="services" id="services">
      <div className="wrap">
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
          <div className="feature-copy">
            <h2>{text(active.tab)}</h2>
            <p className="kicker">{text(active.kicker)}</p>
            <p>{text(active.description)}</p>
            <a className="btn" href="#service-cards">
              {t('view')}
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="feature-visual">
            <img src={active.image} alt={t('alt', { name: text(active.title) })} />
            <div className="included">
              <h3>{t('included')}</h3>
              <ul>
                {active.included.map((item) => (
                  <li key={item.en}>
                    <Icon name="check" size={16} />
                    {text(item)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div id="service-cards">
          <h2 className="section-title">{t('more')}</h2>
          <div className="card-grid">
            {content.services
              .filter((service) => service.id !== 'maintenance')
              .map((service) => (
                <article
                  className="svc-card"
                  key={service.id}
                  id={service.id === 'fleet' ? 'fleet' : undefined}
                >
                  <img src={service.image} alt="" />
                  <div>
                    <h3>{text(service.cardTitle)}</h3>
                    <p>{text(service.blurb)}</p>
                    <button type="button" onClick={() => openService(service.id)}>
                      {t('learn')}
                      <Icon name="arrow" size={16} />
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </div>

        <aside className="specific">
          <div className="specific-copy">
            <h2>{t('specificTitle')}</h2>
            <p>{t('specific')}</p>
            <a className="btn" href="#contact">
              {t('contact')}
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="specific-photo">
            <img src={images.shop} alt={t('shop')} />
          </div>
        </aside>
      </div>
    </section>
  )
}
