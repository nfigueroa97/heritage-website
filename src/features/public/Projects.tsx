import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContent } from '../../shared/content/useContent'
import { images } from '../../data/images'
import { Icon } from './Icons'

export default function Projects() {
  const { t } = useTranslation('projects')
  const { content, text } = useContent()
  const [pos, setPos] = useState(52)

  function move(clientX: number, element: HTMLElement) {
    const rect = element.getBoundingClientRect()
    const next = Math.round(((clientX - rect.left) / rect.width) * 100)
    setPos(Math.min(100, Math.max(0, next)))
  }

  return (
    <section className="projects" id="projects">
      {/*
      <div className="projects-top">
        <div className="wrap">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2>{t('title')}</h2>
          <div className="path-grid">
            {content.paths.map((path) => (
              <button
                type="button"
                className="path-card"
                key={path.id}
                onClick={() => openPath(path.serviceId)}
              >
                <img src={path.image} alt="" />
                <span className="shade" />
                <span className="path-body">
                  <span className="path-icon">
                    <Icon name={path.icon} size={20} />
                  </span>
                  <span>
                    <strong>{text(path.title)}</strong>
                    <em>{text(path.text)}</em>
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
      */}

      <div className="featured" id="featured">
        <div className="wrap featured-grid">
          <div>
            <p className="eyebrow">{t('featured')}</p>
            <h2>
              {t('line1')}
              <br />
              {t('line2')}
            </h2>
            <p>{t('text')}</p>
            <a className="btn" href="#projects">
              {t('view')}
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
            <img src={images.after} alt={t('afterAlt')} draggable="false" />
            <div className="ba-before" style={{ width: `${pos}%` }}>
              <img src={images.before} alt={t('beforeAlt')} draggable="false" />
            </div>
            <div className="ba-line" style={{ left: `${pos}%` }}>
              <span className="ba-knob">
                <Icon name="chevronLeft" size={14} />
                <Icon name="chevronRight" size={14} />
              </span>
            </div>
            <span className="ba-tag left">{t('before')}</span>
            <span className="ba-tag right">{t('after')}</span>
            <input
              className="ba-range"
              type="range"
              min="0"
              max="100"
              value={pos}
              aria-label={t('slider')}
              onChange={(event) => setPos(Number(event.target.value))}
            />
          </div>

          <ul className="detail-list">
            {content.projectDetails.map((item) => (
              <li key={item.title.en}>
                <span>
                  <Icon name={item.icon} size={18} />
                </span>
                {text(item.title)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
