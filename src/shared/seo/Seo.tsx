import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useContent } from '../content/useContent'

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name'
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }
  tag.content = content
}

export function Seo() {
  const { content, locale } = useContent()
  const { pathname } = useLocation()
  const { site } = content

  useEffect(() => {
    const title =
      locale === 'es'
        ? 'Heritage Auto | Reparación y restauración en Las Vegas'
        : 'Heritage Auto | Las Vegas Auto Repair & Restoration'
    const description =
      locale === 'es'
        ? 'Heritage Auto es un taller familiar de reparación y restauración en Las Vegas. Mantenimiento, colisión, rendimiento y flotillas.'
        : 'Heritage Auto is a family-owned auto repair and restoration shop in Las Vegas. Maintenance, collision, performance, and fleet service.'
    const url = `${window.location.origin}${pathname}`
    document.title = title
    document.documentElement.lang = locale
    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:type', 'website', true)
    setMeta('og:url', url, true)
    setMeta('og:site_name', 'Heritage Auto LV', true)
    setMeta('og:locale', locale === 'es' ? 'es_US' : 'en_US', true)
    setMeta('og:image', `${window.location.origin}/og-logo.png`, true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:image', `${window.location.origin}/og-logo.png`)
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    const data = {
      '@context': 'https://schema.org',
      '@type': 'AutoRepair',
      name: site.name,
      telephone: site.phone,
      email: site.email,
      url,
      image: `${window.location.origin}/og-logo.png`,
      logo: `${window.location.origin}/logo.svg`,
      sameAs: [site.facebookUrl, site.instagramUrl, site.yelpUrl].filter(Boolean),
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.street[locale] || site.street.en,
        addressLocality: 'Las Vegas',
        addressRegion: 'NV',
        postalCode: '89102',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: site.lat,
        longitude: site.lng,
      },
      openingHours: site.openingHours,
    }
    let script = document.getElementById('local-business') as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = 'local-business'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(data)
  }, [content, locale, pathname, site])

  return null
}
