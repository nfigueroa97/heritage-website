import { images, values } from '../data/content'
import { Icon } from './Icons'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about-intro">
          <div>
            <p className="eyebrow">About us</p>
            <h2>
              Precision.
              <br />
              Performance.
              <br />
              <span>People.</span>
            </h2>
            <p className="lede">
              At Heritage Auto, we believe great service is built by great people. Our team is
              dedicated to delivering exceptional automotive care with integrity, expertise, and a
              personal touch.
            </p>
            <a className="btn" href="#contact">
              Schedule Appointment
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="about-photo">
            <img
              src={images.mechanic}
              alt="Heritage Auto technician seen from behind in the shop"
            />
            <p className="script-note">
              Real People.
              <br />
              Real Cars.
              <br />
              Real Solutions.
            </p>
          </div>
        </div>

        <div className="mv">
          <article>
            <div className="mv-icon">
              <Icon name="gear" />
            </div>
            <h3>Our Mission</h3>
            <p>
              To provide the highest quality automotive repair, maintenance, and restoration
              services, while building lasting relationships with our customers through trust,
              transparency, and exceptional service.
            </p>
          </article>
          <article className="vision">
            <div className="mv-icon">
              <Icon name="eye" />
            </div>
            <h3>Our Vision</h3>
            <p>
              To be the most trusted and respected auto repair and restoration shop in Las Vegas,
              known for our quality, integrity, and commitment to the automotive community.
            </p>
          </article>
        </div>

        <div className="about-bottom">
          <img
            src={images.camaro}
            alt="Red classic coupe parked inside the Heritage Auto garage"
          />
          <div>
            <div className="values-head">
              <span className="mv-icon">
                <Icon name="shield" />
              </span>
              <h3>Our Values</h3>
            </div>
            <ul className="values">
              {values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
