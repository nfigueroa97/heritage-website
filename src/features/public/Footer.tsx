import { useTranslation } from 'react-i18next'
import { track } from '../../shared/analytics'
import { useContent } from '../../shared/content/useContent'
import { Icon } from './Icons'
import Logo from './Logo'
import MapView from './MapView'

export default function Footer() {
  const { t } = useTranslation('common')
  const { content, text } = useContent()
  const nav = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'reviews', label: t('nav.reviews') },
    { id: 'contact', label: t('nav.contact') },
  ]

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Logo />
          <ul className="footer-contact">
            <li>
              <Icon name="phone" size={16} />
              <a href={content.site.phoneHref} onClick={() => track('phone_click')}>
                {content.site.phone}
              </a>
            </li>
            <li>
              <Icon name="mail" size={16} />
              <a href={content.site.emailHref}>{content.site.email}</a>
            </li>
            <li>
              <Icon name="pin" size={16} />
              <span>
                {text(content.site.street)}
                <br />
                {text(content.site.city)}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h2>{t('footer.hours')}</h2>
          <ul className="hours">
            {content.site.hours.map((row) => (
              <li key={row.days.en}>
                <span>{text(row.days)}</span>
                <strong>{text(row.time)}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-map">
          <div className="map-frame mini">
            <MapView title={t('footer.map')} />
          </div>
          <a
            className="btn"
            href={content.site.directions}
            target="_blank"
            rel="noreferrer"
            onClick={() => track('directions_click')}
          >
            {t('footer.directions')}
            <Icon name="arrow" size={16} />
          </a>
        </div>
        <div className="footer-links">
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="social" aria-label={t('social')}>
            <span aria-hidden="true">
              <Icon name="facebook" size={18} />
            </span>
            <span aria-hidden="true">
              <Icon name="instagram" size={18} />
            </span>
            <span aria-hidden="true">
              <Icon name="yelp" size={18} />
            </span>
          </div>
          <p className="footer-script brush">
            {t('footer.brush1')}
            <br />
            {t('footer.brush2')}
          </p>
        </div>
      </div>
      <div className="wrap footer-copy">{t('footer.copy')}</div>
    </footer>
  )
}
