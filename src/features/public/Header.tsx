import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { track } from '../../shared/analytics'
import { useContent } from '../../shared/content/useContent'
import { Icon } from './Icons'
import Logo from './Logo'

const sectionIds = ['home', 'about', 'services', 'projects', 'reviews', 'contact'] as const

type Result = {
  label: string
  hint: string
  target: string
  serviceId: string | null
  keywords?: string[]
}

export default function Header({ onSelectService }: { onSelectService: (id: string) => void }) {
  const { t } = useTranslation('common')
  const { content, text } = useContent()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const nav = [
    { id: 'home', label: t('nav.home'), keywords: ['home', 'inicio'] },
    { id: 'about', label: t('nav.about'), keywords: ['about', 'about us', 'nosotros', 'acerca'] },
    { id: 'services', label: t('nav.services'), keywords: ['services', 'servicios'] },
    { id: 'projects', label: t('nav.projects'), keywords: ['projects', 'proyectos', 'gallery', 'galería'] },
    { id: 'reviews', label: t('nav.reviews'), keywords: ['reviews', 'reseñas', 'opiniones', 'testimonials'] },
    { id: 'contact', label: t('nav.contact'), keywords: ['contact', 'contacto', 'quote', 'cotización', 'appointment', 'cita', 'schedule'] },
  ]

  const allItems: Result[] = [
    ...content.shopServices.map((service) => ({
      label: service.label,
      hint: t('search.service'),
      target: 'services',
      serviceId: service.serviceId,
    })),
    ...content.services.map((service) => ({
      label: text(service.tab),
      hint: t('search.service'),
      target: 'services',
      serviceId: service.id,
    })),
    {
      label: t('search.fleets'),
      hint: t('search.service'),
      target: 'services',
      serviceId: 'fleet',
    },
    ...content.paths.map((path) => ({
      label: text(path.title),
      hint: t('search.project'),
      target: 'projects',
      serviceId: path.serviceId,
    })),
    {
      label: t('search.featured'),
      hint: t('search.project'),
      target: 'featured',
      serviceId: null,
    },
    // Site-wide topics. Keywords are bilingual so both languages find them.
    ...nav.map((item) => ({
      label: item.label,
      hint: t('search.menu'),
      target: item.id,
      serviceId: null,
      keywords: item.keywords,
    })),
    {
      label: t('search.financing'),
      hint: t('search.financingHint'),
      target: 'financing',
      serviceId: null,
      keywords: ['financing', 'financiamiento', 'financiar', 'payment', 'payments', 'pay', 'pago', 'pagos', 'credit', 'crédito', 'lease', 'apply', 'solicitar'],
    },
    ...['Snap Finance', 'Koalafi', 'Sunbit'].map((name) => ({
      label: name,
      hint: t('search.financingHint'),
      target: 'financing',
      serviceId: null,
      keywords: [name.toLowerCase().split(' ')[0]],
    })),
    {
      label: t('search.phone'),
      hint: t('search.contactHint'),
      target: 'contact',
      serviceId: null,
      keywords: ['phone', 'call', 'tel', 'telephone', 'teléfono', 'telefono', 'llamar', 'número', 'numero'],
    },
    {
      label: t('search.email'),
      hint: t('search.contactHint'),
      target: 'contact',
      serviceId: null,
      keywords: ['email', 'e-mail', 'mail', 'correo'],
    },
    {
      label: t('search.location'),
      hint: t('search.contactHint'),
      target: 'location',
      serviceId: null,
      keywords: ['location', 'map', 'mapa', 'address', 'dirección', 'direccion', 'directions', 'ubicación', 'ubicacion', 'hours', 'horario', 'how to get'],
    },
    {
      label: t('search.promos'),
      hint: t('search.contactHint'),
      target: 'promo',
      serviceId: null,
      keywords: ['promo', 'promos', 'promotion', 'promotions', 'promoción', 'promociones', 'offer', 'offers', 'oferta', 'ofertas', 'discount', 'descuento', 'deal', 'deals', 'special', 'specials'],
    },
    ...[
      ['Facebook', ['facebook', 'fb']],
      ['Instagram', ['instagram', 'ig']],
      ['Yelp', ['yelp']],
    ].map(([label, keywords]) => ({
      label: label as string,
      hint: t('search.social'),
      target: 'footer',
      serviceId: null,
      keywords: [...(keywords as string[]), 'social', 'social media', 'redes', 'redes sociales', 'follow', 'síguenos'],
    })),
  ]

  // Same label from different sources (e.g. "Fleets", "Brakes") is shown once.
  const seen = new Set<string>()
  const searchItems = allItems.filter((item) => {
    const key = `${item.hint}:${item.label.toLowerCase().replace(/[^a-z0-9áéíóúñ]/g, '')}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
      const marker = 150
      let current = 'home'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top - marker <= 0) current = id
      }
      setActive((prev) => (prev === current ? prev : current))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!searchRef.current?.contains(event.target as Node)) setSearchOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  const needle = query.trim().toLowerCase()
  const results = needle
    ? searchItems.filter(
        (item) =>
          item.label.toLowerCase().includes(needle) ||
          item.keywords?.some((word) => word.includes(needle)),
      )
    : []

  function choose(item: Result) {
    if (item.serviceId) onSelectService(item.serviceId)
    track('search_select', { label: item.label })
    setQuery('')
    setSearchOpen(false)
    setOpen(false)
    document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`header${scrolled || open ? ' solid' : ''}${open ? ' menu-open' : ''}`}>
      <div className="wrap header-bar">
        <Logo />
        <nav className={open ? 'nav open' : 'nav'} aria-label={t('primary')}>
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? 'active' : undefined}
              aria-current={active === item.id ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <form
          className="search"
          role="search"
          ref={searchRef}
          onSubmit={(event) => {
            event.preventDefault()
            if (results[0]) choose(results[0])
          }}
        >
          <Icon name="search" size={18} />
          <input
            ref={inputRef}
            type="search"
            placeholder={t('search.placeholder')}
            value={query}
            aria-label={t('search.label')}
            aria-expanded={searchOpen && needle.length > 0}
            onChange={(event) => {
              setQuery(event.target.value)
              setSearchOpen(true)
            }}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setSearchOpen(false)
            }}
          />
          {query && (
            <button
              type="button"
              className="search-clear"
              aria-label={t('search.clear')}
              onClick={() => {
                setQuery('')
                setSearchOpen(false)
                inputRef.current?.focus()
              }}
            >
              <Icon name="close" size={14} />
            </button>
          )}
          {searchOpen && needle && (
            <ul className="search-results">
              {results.length === 0 && <li className="search-empty">{t('search.empty')}</li>}
              {results.map((item, index) => (
                <li key={`${item.label}-${item.serviceId}-${index}`}>
                  <button type="button" onClick={() => choose(item)}>
                    <span>{item.label}</span>
                    <small>{item.hint}</small>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </form>
        <a
          className="header-phone"
          href={content.site.phoneHref}
          onClick={() => track('phone_click')}
        >
          <Icon name="phone" size={18} />
          <span>{content.site.phone}</span>
        </a>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-label={open ? t('menu.close') : t('menu.open')}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}
