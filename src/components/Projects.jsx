import { useState } from 'react'
import { images, paths, projectDetails } from '../data/content'
import { Icon } from './Icons'

export default function Projects({ onSelectService }) {
  const [pos, setPos] = useState(52)

  function move(clientX, element) {
    const rect = element.getBoundingClientRect()
    const next = Math.round(((clientX - rect.left) / rect.width) * 100)
    setPos(Math.min(100, Math.max(0, next)))
  }

  function openPath(path) {
    if (path.serviceId) onSelectService(path.serviceId)
    document.getElementById(path.serviceId ? 'services' : 'featured')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <section className="projects" id="projects">
      <div className="projects-top">
        <div className="wrap">
          <p className="eyebrow">Choose your path</p>
          <h2>What Brings You Here Today?</h2>
          <div className="path-grid">
            {paths.map((path) => (
              <button
                type="button"
                className="path-card"
                key={path.id}
                onClick={() => openPath(path)}
              >
                <img src={path.image} alt="" />
                <span className="shade" />
                <span className="path-body">
                  <span className="path-icon">
                    <Icon name={path.icon} size={20} />
                  </span>
                  <span>
                    <strong>{path.title}</strong>
                    <em>{path.text}</em>
                  </span>
                  <span className="path-go" aria-hidden="true">
                    <Icon name="arrow" size={16} />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="featured" id="featured">
        <div className="wrap featured-grid">
          <div>
            <p className="eyebrow">Featured project</p>
            <h2>
              From Vision
              <br />
              to the Road.
            </h2>
            <p>
              See how we transform classic cars into show-stopping rides.
            </p>
            <a className="btn" href="#projects">
              View All Projects
              <Icon name="arrow" size={18} />
            </a>
          </div>

          <div
            className="ba"
            onPointerDown={(event) => {
              move(event.clientX, event.currentTarget)
              if (event.currentTarget.setPointerCapture) {
                event.currentTarget.setPointerCapture(event.pointerId)
              }
            }}
            onPointerMove={(event) => {
              if (event.buttons === 1) move(event.clientX, event.currentTarget)
            }}
          >
            <img src={images.after} alt="Restored classic Mustang" draggable="false" />
            <div className="ba-before" style={{ width: `${pos}%` }}>
              <img
                src={images.before}
                alt="The same classic car before restoration"
                draggable="false"
              />
            </div>
            <div className="ba-line" style={{ left: `${pos}%` }}>
              <span className="ba-knob">
                <Icon name="chevronLeft" size={14} />
                <Icon name="chevronRight" size={14} />
              </span>
            </div>
            <span className="ba-tag left">Before</span>
            <span className="ba-tag right">After</span>
            <input
              className="ba-range"
              type="range"
              min="0"
              max="100"
              value={pos}
              aria-label="Drag to compare before and after"
              onChange={(event) => setPos(Number(event.target.value))}
            />
          </div>

          <ul className="detail-list">
            {projectDetails.map((item) => (
              <li key={item.title}>
                <span>
                  <Icon name={item.icon} size={18} />
                </span>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
