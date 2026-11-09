import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { AdminOutlet } from './AdminLayout'
import type { SiteContent } from '../../shared/content/schema'
import { useAdminUi } from '../../shared/uiStore'

type Values = Pick<SiteContent, 'reviews' | 'ratingSummary'>

export default function ReviewsPage() {
  const { i18n } = useTranslation()
  const t = i18n.getFixedT('en', 'admin')
  const { content, save, saving } = useOutletContext<AdminOutlet>()
  const setDirty = useAdminUi((state) => state.setDirty)
  const form = useForm<Values>({
    values: { reviews: content.reviews, ratingSummary: content.ratingSummary },
  })

  useEffect(() => {
    setDirty(form.formState.isDirty)
  }, [form.formState.isDirty, setDirty])

  return (
    <form
      className="admin-form"
      onSubmit={form.handleSubmit((values) => {
        const featuredId = values.reviews.find((review) => review.featured)?.id
        save({
          ...content,
          ratingSummary: values.ratingSummary,
          reviews: values.reviews.map((review) => ({
            ...review,
            featured: review.id === featuredId && review.featured,
          })),
        })
        setDirty(false)
      })}
    >
      <h1>{t('reviews')}</h1>
      <fieldset>
        <legend>{t('summary')}</legend>
        <div className="admin-fields">
          <label>
            {t('score')}
            <input {...form.register('ratingSummary.score')} />
          </label>
          <label>
            {t('count')} · {t('english')}
            <input {...form.register('ratingSummary.count.en')} />
          </label>
          <label>
            {t('count')} · {t('spanish')}
            <input {...form.register('ratingSummary.count.es')} />
          </label>
          {content.ratingSummary.platforms.map((platform, index) => (
            <label key={platform.name}>
              {t('platform')} · {platform.name}
              <input {...form.register(`ratingSummary.platforms.${index}.score`)} />
            </label>
          ))}
        </div>
      </fieldset>
      <div className="admin-cards">
        {content.reviews.map((review, index) => (
          <article key={review.id}>
            <h2>{review.name}</h2>
            <div className="admin-fields">
              <label>
                {t('name')}
                <input {...form.register(`reviews.${index}.name`)} />
              </label>
              <label>
                {t('place')}
                <input {...form.register(`reviews.${index}.place`)} />
              </label>
              <label>
                {t('source')}
                <input {...form.register(`reviews.${index}.source`)} />
              </label>
              <label>
                {t('score')}
                <input {...form.register(`reviews.${index}.score`)} />
              </label>
            </div>
            <label>
              {t('quote')} · {t('english')}
              <textarea {...form.register(`reviews.${index}.quote.en`)} />
            </label>
            <label>
              {t('quote')} · {t('spanish')}
              <textarea {...form.register(`reviews.${index}.quote.es`)} />
            </label>
            <label className="admin-check">
              <input type="checkbox" {...form.register(`reviews.${index}.visible`)} />
              {t('visible')}
            </label>
            <label className="admin-check">
              <input type="checkbox" {...form.register(`reviews.${index}.spotlight`)} />
              {t('spotlight')}
            </label>
            <label className="admin-check">
              <input
                type="radio"
                name="featured-review"
                checked={form.watch(`reviews.${index}.featured`)}
                onChange={() => {
                  content.reviews.forEach((_, item) => {
                    form.setValue(`reviews.${item}.featured`, item === index, { shouldDirty: true })
                  })
                }}
              />
              {t('featured')}
            </label>
          </article>
        ))}
      </div>
      <button type="submit" disabled={saving}>
        {t('save')}
      </button>
    </form>
  )
}
