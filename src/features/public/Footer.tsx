import { useTranslation } from 'react-i18next'
// import { track } from '../../shared/analytics'
import { useContent } from '../../shared/content/useContent'
import { Icon } from './Icons'
import Logo from './Logo'

export default function Footer() {
  const { t } = useTranslation('common')
  const { content, text } = useContent()
  // const nav = [
  //   { id: 'home', label: t('nav.home') },
  //   { id: 'services', label: t('nav.services') },
  //   { id: 'projects', label: t('nav.projects') },
  //   { id: 'reviews', label: t('nav.reviews') },
  //   { id: 'about', label: t('nav.about') },
  //   { id: 'contact', label: t('nav.contact') },
  // ]

  return (
    <footer className="footer" id="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo />
          <p className="footer-script brush">
            {t('footer.brush1')}
            <br />
            {t('footer.brush2')}
          </p>
        </div>

        <ul className="footer-contact">
          <li>
            <Icon name="pin" size={26} />
            <span>
              {text(content.site.street)}
              <br />
              {text(content.site.city)}
            </span>
          </li>
          
          {/* <li>
            <Icon name="mail" size={26} />
            <a href={content.site.emailHref}>{content.site.email}</a>
          </li> */}
          {/* <li>
            <Icon name="phone" size={26} />
            <a href={content.site.phoneHref} onClick={() => track('phone_click')}>
              {content.site.phone}
            </a>
          </li> */}
          <li>
            <Icon name="clock" size={26} />
            <span>
              {content.site.hours.map((row) => (
                <span key={row.days.en} className="hours-row">
                  {text(row.days)}: {text(row.time)}
                </span>
              ))}
            </span>
          </li>
        </ul>

        <div className="footer-follow">
          <h2>{t('footer.follow')}</h2>
          <div className="social" aria-label={t('social')}>
            <a className="fb" href={content.site.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Icon name="facebook" size={10} />
            </a>
            <a className="ig" href={content.site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Icon name="instagram" size={10} />
            </a>
            <a className="yelp" href={content.site.yelpUrl} target="_blank" rel="noopener noreferrer" aria-label="Yelp">
              <Icon name="yelp" size={10} />
            </a>
          </div>
        </div>
      </div>
      <div className="wrap footer-copy">
        <br />{t('footer.copy')}</div>
    </footer>
  )
}
