import { images, services } from '../data/content'
import { Icon } from './Icons'

export default function Services({ activeId, onSelect }) {
  const active = services.find((service) => service.id === activeId) ?? services[0]

  function openService(id) {
    onSelect(id)
    const target = id === 'fleet' ? 'fleet' : 'services'
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="tabs" role="tablist" aria-label="Service categories">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              role="tab"
              id={`tab-${service.id}`}
              aria-selected={service.id === active.id}
              aria-controls="service-panel"
              className={service.id === active.id ? 'active' : undefined}
              onClick={() => onSelect(service.id)}
            >
              <Icon name={service.icon} size={26} />
              {service.tab}
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
            <h2>{active.tab}</h2>
            <p className="kicker">{active.kicker}</p>
            <p>{active.description}</p>
            <a className="btn" href="#service-cards">
              View Services
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="feature-visual">
            <img src={active.image} alt={`${active.title} service`} />
            <div className="included">
              <h3>Included Services</h3>
              <ul>
                {active.included.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div id="service-cards">
          <h2 className="section-title">Additional Services</h2>
          <div className="card-grid">
            {services
              .filter((service) => service.id !== 'maintenance')
              .map((service) => (
                <article
                  className="svc-card"
                  key={service.id}
                  id={service.id === 'fleet' ? 'fleet' : undefined}
                >
                  <img src={service.image} alt="" />
                  <div>
                    <h3>{service.cardTitle}</h3>
                    <p>{service.blurb}</p>
                    <button type="button" onClick={() => openService(service.id)}>
                      Learn More
                      <Icon name="arrow" size={16} />
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </div>

        <aside className="specific">
          <div className="specific-copy">
            <h2>Need something specific?</h2>
            <p>We&apos;re here to help with all your automotive needs.</p>
            <a className="btn" href="#contact">
              Contact Us
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="specific-photo">
            <img src={images.shop} alt="Vehicles parked outside the Heritage Auto shop" />
          </div>
        </aside>
      </div>
    </section>
  )
}
