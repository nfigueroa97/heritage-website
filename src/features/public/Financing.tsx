import { useTranslation } from 'react-i18next'
import { track } from '../../shared/analytics'
import { useContent } from '../../shared/content/useContent'
import { Icon } from './Icons'

function ChatIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 7 0 0 1-8 7 9 9 0 0 1-3-.5L4 20l1.4-4A7 7 0 0 1 5 12a8 7 0 0 1 8-7 8 7 0 0 1 8 7Z" />
    </svg>
  )
}

export default function Financing() {
  const { t } = useTranslation('financing')
  const { content } = useContent()

  return (
    <section className="financing" id="financing">
      <div className="wrap">
        <div className="financing-head">
          <span className="financing-rule" />
          <h2 className="financing-ribbon">{t('eyebrow')}</h2>
          <span className="financing-rule" />
        </div>

        <ul className="financing-grid">
          {content.financing.map((partner) => {
            const apply = Boolean(partner.url)
            return (
              <li className={`financing-card${apply ? ' is-primary' : ''}`} key={partner.id}>
                <div className="financing-logo">
                  {partner.logo ? (
                    <img src={partner.logo} alt={partner.name} />
                  ) : (
                    <strong className={`wordmark ${partner.id}`}>{partner.name}</strong>
                  )}
                  {apply && <span className="financing-badge">{t('badge')}</span>}
                </div>
                <p>{apply ? t('applyText', { name: partner.name }) : t('askText', { name: partner.name })}</p>
                {apply ? (
                  <a
                    className="btn financing-btn"
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('opens', { name: partner.name })}
                    onClick={() => track('financing_click', { id: partner.id })}
                  >
                    {t('apply', { name: partner.name })}
                    <Icon name="arrow" size={18} />
                  </a>
                ) : (
                  <a
                    className="financing-btn ghost"
                    href="#contact-form"
                    onClick={() => track('financing_ask', { id: partner.id })}
                  >
                    <ChatIcon size={22} />
                    {t('ask')}
                  </a>
                )}
              </li>
            )
          })}
        </ul>

        <div className="financing-help">
          <span className="financing-help-icon">
            <ChatIcon size={44} />
          </span>
          <div>
            <h3>{t('questions')}</h3>
            <p>{t('questionsText')}</p>
          </div>
          <a className="financing-contact" href={content.site.phoneHref} onClick={() => track('phone_click')}>
            <Icon name="phone" size={18} />
            {t('contact')}
          </a>
        </div>
        <p className="financing-note">{t('disclaimer')}</p>
      </div>
    </section>
  )
}
