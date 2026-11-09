import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EmbedFrame } from '../../shared/embeds/EmbedFrame'
import { useContent } from '../../shared/content/useContent'

export default function MapView({ title }: { title?: string }) {
  const { t } = useTranslation('contact')
  const { content } = useContent()
  const [useEmbed, setUseEmbed] = useState(false)
  const label = title ?? t('map')

  if (useEmbed) {
    return (
      <EmbedFrame
        title={label}
        src={content.site.mapEmbed}
        fallbackHref={content.site.directions}
        fallbackLabel={t('directions')}
      />
    )
  }

  return (
    <img
      src={content.site.mapImage}
      alt={label}
      onError={() => setUseEmbed(true)}
    />
  )
}
