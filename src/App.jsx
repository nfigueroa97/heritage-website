import { useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Reviews from './components/Reviews'
import Services from './components/Services'

export default function App() {
  const [serviceId, setServiceId] = useState('maintenance')

  return (
    <>
      <Header onSelectService={setServiceId} />
      <main>
        <Hero />
        <About />
        <Services activeId={serviceId} onSelect={setServiceId} />
        <Projects onSelectService={setServiceId} />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
