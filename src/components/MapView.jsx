import { useState } from 'react'
import { site } from '../data/content'

export default function MapView({ title = 'Map of Heritage Auto at 3082 Sheridan Street' }) {
  const [useEmbed, setUseEmbed] = useState(false)

  if (useEmbed) {
    return (
      <iframe
        title={title}
        src={site.mapEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    )
  }

  return (
    <img
      src={site.mapImage}
      alt={title}
      onError={() => setUseEmbed(true)}
    />
  )
}
