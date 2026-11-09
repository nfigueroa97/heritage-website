import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { AdminOutlet } from './AdminLayout'
import type { Service } from '../../shared/content/schema'
import { useAdminUi } from '../../shared/uiStore'

type Values = {
  services: Array<
    Service & {
      includedEn: string
      includedEs: string
    }
  >
}

export default function ServicesPage() {
  const { i18n } = useTranslation()
  const t = i18n.getFixedT('en', 'admin')
  const { content, save, saving } = useOutletContext<AdminOutlet>()
  const setDirty = useAdminUi((state) => state.setDirty)
  const form = useForm<Values>({
    values: {
      services: content.services.map((service) => ({
        ...service,
        includedEn: service.included.map((item) => item.en).join('\n'),
        includedEs: service.included.map((item) => item.es).join('\n'),
      })),
    },
  })
  const fields = useFieldArray({ control: form.control, name: 'services' })

  useEffect(() => {
    setDirty(form.formState.isDirty)
  }, [form.formState.isDirty, setDirty])

  return (
    <form
      className="admin-form"
      onSubmit={form.handleSubmit((values) => {
        save({
          ...content,
          services: values.services.map((service) => {
            const en = service.includedEn.split('\n').map((line) => line.trim()).filter(Boolean)
            const es = service.includedEs.split('\n').map((line) => line.trim()).filter(Boolean)
            const included = en.map((line, index) => ({ en: line, es: es[index] || line }))
            return {
              id: service.id,
              icon: service.icon,
              image: service.image,
              tab: service.tab,
              title: service.title,
              cardTitle: service.cardTitle,
              blurb: service.blurb,
              kicker: service.kicker,
              description: service.description,
              included,
            }
          }),
        })
        setDirty(false)
      })}
    >
      <h1>{t('services')}</h1>
      <p>{t('locked')}</p>
      {fields.fields.map((service, index) => (
        <fieldset key={service.id}>
          <legend>{service.id}</legend>
          <div className="admin-fields">
            <label>
              {t('tab')} · {t('english')}
              <input {...form.register(`services.${index}.tab.en`)} />
            </label>
            <label>
              {t('tab')} · {t('spanish')}
              <input {...form.register(`services.${index}.tab.es`)} />
            </label>
            <label>
              {t('title')} · {t('english')}
              <input {...form.register(`services.${index}.title.en`)} />
            </label>
            <label>
              {t('title')} · {t('spanish')}
              <input {...form.register(`services.${index}.title.es`)} />
            </label>
            <label>
              {t('card')} · {t('english')}
              <input {...form.register(`services.${index}.cardTitle.en`)} />
            </label>
            <label>
              {t('card')} · {t('spanish')}
              <input {...form.register(`services.${index}.cardTitle.es`)} />
            </label>
            <label>
              {t('blurb')} · {t('english')}
              <input {...form.register(`services.${index}.blurb.en`)} />
            </label>
            <label>
              {t('blurb')} · {t('spanish')}
              <input {...form.register(`services.${index}.blurb.es`)} />
            </label>
            <label>
              {t('kicker')} · {t('english')}
              <input {...form.register(`services.${index}.kicker.en`)} />
            </label>
            <label>
              {t('kicker')} · {t('spanish')}
              <input {...form.register(`services.${index}.kicker.es`)} />
            </label>
          </div>
          <label>
            {t('description')} · {t('english')}
            <textarea {...form.register(`services.${index}.description.en`)} />
          </label>
          <label>
            {t('description')} · {t('spanish')}
            <textarea {...form.register(`services.${index}.description.es`)} />
          </label>
          <div className="admin-fields">
            <label>
              {t('included')} · {t('english')}
              <textarea {...form.register(`services.${index}.includedEn`)} />
            </label>
            <label>
              {t('included')} · {t('spanish')}
              <textarea {...form.register(`services.${index}.includedEs`)} />
            </label>
          </div>
        </fieldset>
      ))}
      <button type="submit" disabled={saving}>
        {t('save')}
      </button>
    </form>
  )
}
