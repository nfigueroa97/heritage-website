import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { installAnalytics } from '../../shared/analytics'
import { ChatMount } from '../../shared/ChatMount'
import { Seo } from '../../shared/seo/Seo'
import type { Locale } from '../../shared/content/schema'
import About from './About'
import Contact from './Contact'
import Financing from './Financing'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'
import Projects from './Projects'
import Reviews from './Reviews'
import Services from './Services'

export default function PublicPage({ locale = 'en' }: { locale?: Locale }) {
  const { i18n } = useTranslation()
  const [serviceId, setServiceId] = useState('maintenance')

  useEffect(() => {
    void i18n.changeLanguage(locale)
    document.documentElement.lang = locale
  }, [i18n, locale])

  useEffect(() => {
    installAnalytics()
  }, [])

  return (
    <>
      <Seo />
      <Header onSelectService={setServiceId} />
      <main>
        <Hero />
        <About />
        <Services activeId={serviceId} onSelect={setServiceId} />
        <Financing />
        <Projects />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <ChatMount />
    </>
  )
}
