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

  const nav = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'reviews', label: t('nav.reviews') },
    { id: 'contact', label: t('nav.contact') },
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
    ? searchItems.filter((item) => item.label.toLowerCase().includes(needle))
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
