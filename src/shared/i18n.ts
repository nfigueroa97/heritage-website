import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from '../locales/en/common.json'
import esCommon from '../locales/es/common.json'
import enHero from '../locales/en/hero.json'
import esHero from '../locales/es/hero.json'
import enAbout from '../locales/en/about.json'
import esAbout from '../locales/es/about.json'
import enServices from '../locales/en/services.json'
import esServices from '../locales/es/services.json'
import enProjects from '../locales/en/projects.json'
import esProjects from '../locales/es/projects.json'
import enReviews from '../locales/en/reviews.json'
import esReviews from '../locales/es/reviews.json'
import enContact from '../locales/en/contact.json'
import esContact from '../locales/es/contact.json'
import enAdmin from '../locales/en/admin.json'
import esAdmin from '../locales/es/admin.json'

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      hero: enHero,
      about: enAbout,
      services: enServices,
      projects: enProjects,
      reviews: enReviews,
      contact: enContact,
      admin: enAdmin,
    },
    es: {
      common: esCommon,
      hero: esHero,
      about: esAbout,
      services: esServices,
      projects: esProjects,
      reviews: esReviews,
      contact: esContact,
      admin: esAdmin,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
