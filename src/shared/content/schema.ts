import { z } from 'zod'

export const localeSchema = z.object({
  en: z.string(),
  es: z.string(),
})

export type Localized = z.infer<typeof localeSchema>
export type Locale = 'en' | 'es'

export const serviceSchema = z.object({
  id: z.string(),
  icon: z.string(),
  image: z.string(),
  tab: localeSchema,
  title: localeSchema,
  cardTitle: localeSchema,
  blurb: localeSchema,
  kicker: localeSchema,
  description: localeSchema,
  included: z.array(localeSchema),
  highlights: z.array(z.object({ icon: z.string(), title: localeSchema, text: localeSchema })).optional(),
})

export const pathSchema = z.object({
  id: z.string(),
  icon: z.string(),
  image: z.string(),
  title: localeSchema,
  text: localeSchema,
  serviceId: z.string().nullable(),
})

export const reviewSchema = z.object({
  id: z.string(),
  name: z.string(),
  place: z.string(),
  score: z.string(),
  stars: z.number(),
  source: z.string(),
  icon: z.string(),
  date: z.string(),
  photo: z.string(),
  quote: localeSchema,
  spotlight: z.boolean(),
  visible: z.boolean(),
  featured: z.boolean(),
})

export const contentSchema = z.object({
  site: z.object({
    name: z.string(),
    phone: z.string(),
    phoneHref: z.string(),
    email: z.string(),
    emailHref: z.string(),
    street: localeSchema,
    city: localeSchema,
    address: localeSchema,
    hours: z.array(z.object({ days: localeSchema, time: localeSchema })),
    directions: z.string(),
    googleReviewUrl: z.string().optional(),
    googleReviewsUrl: z.string().optional(),
    instagramUrl: z.string().optional(),
    facebookUrl: z.string().optional(),
    yelpUrl: z.string().optional(),
    mapImage: z.string(),
    mapEmbed: z.string(),
    lat: z.number(),
    lng: z.number(),
    openingHours: z.array(z.string()),
  }),
  services: z.array(serviceSchema),
  paths: z.array(pathSchema),
  projectDetails: z.array(z.object({ icon: z.string(), title: localeSchema })),
  shopServices: z.array(z.object({ label: z.string(), serviceId: z.string() })),
  financing: z.array(z.object({ id: z.string(), name: z.string(), url: z.string().optional(), logo: z.string().optional() })),
  ratingSummary: z.object({
    score: z.string(),
    count: localeSchema,
    platforms: z.array(z.object({ name: z.string(), score: z.string(), icon: z.string() })),
  }),
  reviews: z.array(reviewSchema),
  values: z.array(localeSchema),
})

export type SiteContent = z.infer<typeof contentSchema>
export type Service = z.infer<typeof serviceSchema>
export type Review = z.infer<typeof reviewSchema>
export type ProjectPath = z.infer<typeof pathSchema>

export function text(value: Localized, locale: Locale) {
  return value[locale] || value.en
}

export function phoneHrefFrom(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `tel:+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `tel:+${digits}`
  return `tel:+${digits}`
}
