import { useTranslation } from 'react-i18next'
import { track } from '../../shared/analytics'
import { useContent } from '../../shared/content/useContent'
import { images } from '../../data/images'
import { Icon } from './Icons'

export default function Hero() {
  const { t } = useTranslation('hero')
  const { content, text } = useContent()
  const hours = content.site.hours[0]
  const facts = [
    {
      icon: 'pin',
      title: text(content.site.street),
      text: text(content.site.city),
      href: content.site.directions,
      link: t('facts.directions'),
    },
    { icon: 'clock', title: text(hours.days), text: text(hours.time) },
    { icon: 'shield', title: t('facts.expert'), text: t('facts.craft') },
    { icon: 'users', title: t('facts.family'), text: t('facts.operated') },
    { icon: 'car', title: t('facts.makes'), text: t('facts.models') },
    { icon: 'star', title: t('facts.trusted'), text: t('facts.city') },
  ]

  return (
    <section className="hero" id="home">
      <picture>
        <source media="(max-width: 600px)" srcSet={images.heroMobile} />
        <img className="hero-photo" src={images.hero} alt={t('photo')} />
      </picture>
      <div className="hero-shade" />
      <div className="wrap hero-content">
        <div className="hero-copy">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h1>
            {t('line1')}
            <br />
            {t('line2')} <span>{t('accent')}</span>
          </h1>
          <p className="hero-lead">{t('lead')}</p>
          <p className="hero-sub">{t('sub')}</p>
          <a className="btn" href="#contact-form" onClick={() => track('schedule_click')}>
            <Icon name="calendar" size={18} />
            {t('cta')}
            <Icon name="arrow" size={18} />
          </a>
        </div>
        <img className="hero-script" src="/heritage-in-your-dna-black.svg" alt={t('art')} />
      </div>
      <div className="hero-bar">
        <div className="wrap hero-facts">
          {facts.map((fact) => (
            <div className="fact" key={fact.icon + fact.title}>
              <Icon name={fact.icon} size={22} />
              <div>
                <strong>{fact.title}</strong>
                <span>{fact.text}</span>
                {fact.href && (
                  <a
                    href={fact.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track('directions_click')}
                  >
                    {fact.link}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
