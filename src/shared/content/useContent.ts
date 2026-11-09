import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { defaultContent } from '../../data/defaults'
import { loadContent } from './repository'
import { text, type Locale, type Localized } from './schema'

export const contentKey = ['content'] as const

export function useLocale(): Locale {
  const { i18n } = useTranslation()
  return i18n.language.startsWith('es') ? 'es' : 'en'
}

export function useContent() {
  const locale = useLocale()
  const query = useQuery({
    queryKey: contentKey,
    queryFn: loadContent,
    placeholderData: defaultContent,
  })
  return {
    ...query,
    content: query.data ?? defaultContent,
    locale,
    text: (value: Localized) => text(value, locale),
  }
}
