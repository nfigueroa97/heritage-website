import { useEffect, useRef } from 'react'
import { bookingSteps, site } from '../data/content'
import { Icon } from './Icons'
import MapView from './MapView'

const SCHEDULER_SRC =
  'https://app.shopmonkey.cloud/scripts/scheduler.js?lid=e6448f5e-15b5-4e0b-be3c-64610d7158d8&e=stable&embed=true'

function ShopMonkeyScheduler() {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const script = document.createElement('script')
    script.src = SCHEDULER_SRC
    script.id = 'sm_w_scheduler'
    script.defer = true
    host.appendChild(script)

    return () => {
      script.remove()
      document.getElementById('sm_w_scheduler_iframe')?.remove()
    }
  }, [])

  return <div className="scheduler-host" ref={hostRef} />
}

export default function Contact() {

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="methods">
          <div>
            <Icon name="phone" size={28} />
            <h2>Call Us</h2>
            <a href={site.phoneHref}>{site.phone}</a>
            <p>Mon – Fri 6:00 AM – 3:00 PM</p>
          </div>
          <div>
            <Icon name="pin" size={28} />
            <h2>Visit Us</h2>
            <p>
              {site.street}
              <br />
              {site.city}
            </p>
          </div>
          <div>
            <Icon name="mail" size={28} />
            <h2>Email Us</h2>
            <a href={site.emailHref}>{site.email}</a>
            <p>We&apos;ll get back to you soon.</p>
          </div>
        </div>

        <div className="booking">
          <div className="booking-aside">
            <p className="eyebrow">Book an appointment</p>
            <h2>Schedule Your Service</h2>
            <p>Use our online scheduler to book your appointment quickly and easily.</p>
            <ul className="steps">
              {bookingSteps.map((step) => (
                <li key={step.title}>
                  <span>
                    <Icon name={step.icon} size={18} />
                  </span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="aside-script">
              Fast. Easy.
              <br />
              Convenient.
            </p>
          </div>

          <div className="form-panel">
            <ShopMonkeyScheduler />
          </div>
        </div>

        <div className="location">
          <div>
            <Icon name="pin" size={28} />
            <h2>Our Location</h2>
            <p>
              {site.street}
              <br />
              {site.city}
            </p>
            <a className="btn btn-ghost" href={site.directions} target="_blank" rel="noreferrer">
              Get Directions
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
