import { useTranslation } from 'react-i18next'
import { EmbedFrame } from '../../shared/embeds/EmbedFrame'
import { useContent } from '../../shared/content/useContent'

export default function MapView({ title }: { title?: string }) {
  const { t } = useTranslation('contact')
  const { content } = useContent()

  return (
    <EmbedFrame
      title={title ?? t('map')}
      src={content.site.mapEmbed}
      fallbackHref={content.site.directions}
      fallbackLabel={t('directions')}
    />
  )
}
