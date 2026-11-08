import { heroFacts, images } from '../data/content'
import { Icon } from './Icons'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <img
        className="hero-photo"
        src={images.hero}
        alt="Silver sports car driving a desert highway toward the mountains"
      />
      <div className="hero-shade" />
      <div className="wrap hero-content">
        <div className="hero-copy">
          <p className="eyebrow">Las Vegas Auto Repair & Restoration</p>
          <h1>
            Let&apos;s Get You
            <br />
            Back on the <span>Road.</span>
          </h1>
          <p className="hero-lead">Your ride is in good hands at Heritage Auto.</p>
          <p className="hero-sub">
            Expert service, honest advice and high-quality repairs for every make and model.
          </p>
          <a className="btn" href="#contact">
            <Icon name="calendar" size={18} />
            Schedule Your Appointment
            <Icon name="arrow" size={18} />
          </a>
        </div>
        <p className="hero-script brush">
          Heritage in your<br />
          <span>DNA</span>
        </p>
      </div>
      <div className="hero-bar">
        <div className="wrap hero-facts">
          {heroFacts.map((fact) => (
            <div className="fact" key={fact.title}>
              <Icon name={fact.icon} size={22} />
              <div>
                <strong>{fact.title}</strong>
                <span>{fact.text}</span>
                {fact.href && (
                  <a href={fact.href} target="_blank" rel="noreferrer">
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
