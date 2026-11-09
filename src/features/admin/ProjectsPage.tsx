import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { AdminOutlet } from './AdminLayout'
import type { SiteContent } from '../../shared/content/schema'
import { useAdminUi } from '../../shared/uiStore'

type Values = Pick<SiteContent, 'paths' | 'projectDetails'>

export default function ProjectsPage() {
  const { i18n } = useTranslation()
  const t = i18n.getFixedT('en', 'admin')
  const { content, save, saving } = useOutletContext<AdminOutlet>()
  const setDirty = useAdminUi((state) => state.setDirty)
  const form = useForm<Values>({
    values: { paths: content.paths, projectDetails: content.projectDetails },
  })

  useEffect(() => {
    setDirty(form.formState.isDirty)
  }, [form.formState.isDirty, setDirty])

  return (
    <form
      className="admin-form"
      onSubmit={form.handleSubmit((values) => {
        save({ ...content, paths: values.paths, projectDetails: values.projectDetails })
        setDirty(false)
      })}
    >
      <h1>{t('projects')}</h1>
      {content.paths.map((path, index) => (
        <fieldset key={path.id}>
          <legend>
            {t('path')} · {path.id}
          </legend>
          <div className="admin-fields">
            <label>
              {t('title')} · {t('english')}
              <input {...form.register(`paths.${index}.title.en`)} />
            </label>
            <label>
              {t('title')} · {t('spanish')}
              <input {...form.register(`paths.${index}.title.es`)} />
            </label>
            <label>
              {t('description')} · {t('english')}
              <input {...form.register(`paths.${index}.text.en`)} />
            </label>
            <label>
              {t('description')} · {t('spanish')}
              <input {...form.register(`paths.${index}.text.es`)} />
            </label>
          </div>
        </fieldset>
      ))}
      {content.projectDetails.map((item, index) => (
        <fieldset key={item.title.en}>
          <legend>{t('detail')}</legend>
          <div className="admin-fields">
            <label>
              {t('english')}
              <input {...form.register(`projectDetails.${index}.title.en`)} />
            </label>
            <label>
              {t('spanish')}
              <input {...form.register(`projectDetails.${index}.title.es`)} />
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
