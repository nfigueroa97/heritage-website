import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { AdminOutlet } from './AdminLayout'
import { useAdminUi } from '../../shared/uiStore'
import './admin.css'

const pair = z.object({ en: z.string().min(1), es: z.string().min(1) })
const schema = z.object({
  phone: z.string().min(7),
  email: z.string().email(),
  street: pair,
  city: pair,
  address: pair,
  hours: z.tuple([
    z.object({ days: pair, time: pair }),
    z.object({ days: pair, time: pair }),
  ]),
})

type Values = z.infer<typeof schema>

export default function BusinessPage() {
  const { i18n } = useTranslation()
  const t = i18n.getFixedT('en', 'admin')
  const { content, save, saving } = useOutletContext<AdminOutlet>()
  const setDirty = useAdminUi((state) => state.setDirty)
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    values: {
      phone: content.site.phone,
      email: content.site.email,
      street: content.site.street,
      city: content.site.city,
      address: content.site.address,
      hours: [content.site.hours[0], content.site.hours[1]],
    },
  })

  useEffect(() => {
    setDirty(form.formState.isDirty)
  }, [form.formState.isDirty, setDirty])

  return (
    <form
      className="admin-form"
      onSubmit={form.handleSubmit((values) => {
        save({
          ...content,
          site: {
            ...content.site,
            phone: values.phone,
            email: values.email,
            street: values.street,
            city: values.city,
            address: values.address,
            hours: values.hours,
          },
        })
        setDirty(false)
      })}
    >
      <h1>{t('business')}</h1>
      <label>
        {t('phone')}
        <input {...form.register('phone')} />
      </label>
      <label>
        {t('email')}
        <input {...form.register('email')} />
      </label>
      <div className="admin-fields">
        <label>
          {t('street')} · {t('english')}
          <input {...form.register('street.en')} />
        </label>
        <label>
          {t('street')} · {t('spanish')}
          <input {...form.register('street.es')} />
        </label>
        <label>
          {t('city')} · {t('english')}
          <input {...form.register('city.en')} />
        </label>
        <label>
          {t('city')} · {t('spanish')}
          <input {...form.register('city.es')} />
        </label>
        <label>
          {t('address')} · {t('english')}
          <input {...form.register('address.en')} />
        </label>
        <label>
          {t('address')} · {t('spanish')}
          <input {...form.register('address.es')} />
        </label>
      </div>
      <fieldset>
        <div className="admin-fields">
          <label>
            {t('days')} · {t('english')}
            <input {...form.register('hours.0.days.en')} />
          </label>
          <label>
            {t('days')} · {t('spanish')}
            <input {...form.register('hours.0.days.es')} />
          </label>
          <label>
            {t('time')} · {t('english')}
            <input {...form.register('hours.0.time.en')} />
          </label>
          <label>
            {t('time')} · {t('spanish')}
            <input {...form.register('hours.0.time.es')} />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="admin-fields">
          <label>
            {t('days')} · {t('english')}
            <input {...form.register('hours.1.days.en')} />
          </label>
          <label>
            {t('days')} · {t('spanish')}
            <input {...form.register('hours.1.days.es')} />
          </label>
          <label>
            {t('time')} · {t('english')}
            <input {...form.register('hours.1.time.en')} />
          </label>
          <label>
            {t('time')} · {t('spanish')}
            <input {...form.register('hours.1.time.es')} />
          </label>
        </div>
      </fieldset>
      <button type="submit" disabled={saving}>
        {t('save')}
      </button>
    </form>
  )
}
