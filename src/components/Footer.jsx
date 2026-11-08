import { nav, site } from '../data/content'
import { Icon } from './Icons'
import Logo from './Logo'
import MapView from './MapView'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Logo />
          <ul className="footer-contact">
            <li>
              <Icon name="phone" size={16} />
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            <li>
              <Icon name="mail" size={16} />
              <a href={site.emailHref}>{site.email}</a>
            </li>
            <li>
              <Icon name="pin" size={16} />
              <span>
                {site.street}
                <br />
                {site.city}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h2>Hours</h2>
          <ul className="hours">
            {site.hours.map((row) => (
              <li key={row.days}>
                <span>{row.days}</span>
                <strong>{row.time}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-map">
          <div className="map-frame mini">
            <MapView title="Small map of Heritage Auto" />
          </div>
          <a className="btn" href={site.directions} target="_blank" rel="noreferrer">
            Get Directions
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
          <div className="social" aria-label="Social media">
            <span aria-hidden="true"><Icon name="facebook" size={18} /></span>
            <span aria-hidden="true"><Icon name="instagram" size={18} /></span>
            <span aria-hidden="true"><Icon name="yelp" size={18} /></span>
          </div>
          <p className="footer-script">
            Let&apos;s Get You
            <br />
            Back on the Road.
          </p>
        </div>
      </div>
      <div className="wrap footer-copy">© 2026 Heritage Auto LV. All rights reserved.</div>
    </footer>
  )
}
