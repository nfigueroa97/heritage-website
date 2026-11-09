import { defaultContent } from '../../data/defaults'
import {
  contentSchema,
  phoneHrefFrom,
  type Service,
  type SiteContent,
} from './schema'

const STORAGE_KEY = 'heritage-content'

function readStored(): unknown {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function mergeServices(saved: Service[] | undefined): Service[] {
  return defaultContent.services.map((service) => {
    const next = saved?.find((item) => item.id === service.id)
    if (!next) return service
    return {
      ...service,
      ...next,
      id: service.id,
      icon: service.icon,
      image: service.image,
    }
  })
}

export function mergeContent(saved: unknown): SiteContent {
  const parsed = contentSchema.partial().safeParse(saved)
  if (!parsed.success || !saved || typeof saved !== 'object') return defaultContent
  const incoming = parsed.data
  const site = { ...defaultContent.site, ...incoming.site }
  const address = site.address?.en || defaultContent.site.address.en
  return contentSchema.parse({
    ...defaultContent,
    ...incoming,
    site: {
      ...site,
      phoneHref: phoneHrefFrom(site.phone || defaultContent.site.phone),
      emailHref: `mailto:${site.email || defaultContent.site.email}`,
      directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`,
      mapImage: defaultContent.site.mapImage,
      mapEmbed: defaultContent.site.mapEmbed,
      lat: defaultContent.site.lat,
      lng: defaultContent.site.lng,
      openingHours: defaultContent.site.openingHours,
      name: defaultContent.site.name,
    },
    services: mergeServices(incoming.services as Service[] | undefined),
    shopServices: defaultContent.shopServices,
    paths: defaultContent.paths.map((path) => {
      const next = incoming.paths?.find((item) => item.id === path.id)
      return next
        ? { ...path, title: next.title, text: next.text, serviceId: path.serviceId, icon: path.icon, image: path.image }
        : path
    }),
    projectDetails: defaultContent.projectDetails.map((item, index) => {
      const next = incoming.projectDetails?.[index]
      return next ? { ...item, title: next.title, icon: item.icon } : item
    }),
    reviews: incoming.reviews?.length ? incoming.reviews : defaultContent.reviews,
    values: incoming.values?.length ? incoming.values : defaultContent.values,
    ratingSummary: incoming.ratingSummary
      ? { ...defaultContent.ratingSummary, ...incoming.ratingSummary }
      : defaultContent.ratingSummary,
  })
}

export async function loadContent(): Promise<SiteContent> {
  const api = import.meta.env.VITE_API_URL
  if (api) {
    try {
      const response = await fetch(`${api.replace(/\/$/, '')}/content`)
      if (response.ok) return mergeContent(await response.json())
    } catch {
      /* use the local copy */
    }
  }
  return mergeContent(readStored())
}

export async function saveContent(content: SiteContent): Promise<SiteContent> {
  const next = mergeContent(content)
  const api = import.meta.env.VITE_API_URL
  if (api) {
    try {
      const response = await fetch(`${api.replace(/\/$/, '')}/content`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(next),
      })
      if (!response.ok) throw new Error('save failed')
    } catch {
      /* keep the browser copy either way */
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function resetContent() {
  localStorage.removeItem(STORAGE_KEY)
  return defaultContent
}
