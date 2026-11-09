import { useEffect, useState } from 'react'
import { Navigate, Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAdmin, signOut } from './auth'
import { contentKey, useContent } from '../../shared/content/useContent'
import { resetContent, saveContent } from '../../shared/content/repository'
import { useAdminUi } from '../../shared/uiStore'
import type { SiteContent } from '../../shared/content/schema'
import './admin.css'

export function AdminGuard() {
  if (!isAdmin()) return <Navigate to="/admin/login" replace />
  return <Outlet />
}

export function AdminLayout() {
  const { i18n } = useTranslation()
  const t = i18n.getFixedT('en', 'admin')
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { content } = useContent()
  const navOpen = useAdminUi((state) => state.navOpen)
  const setNavOpen = useAdminUi((state) => state.setNavOpen)
  const dirty = useAdminUi((state) => state.dirty)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    function onLeave(event: BeforeUnloadEvent) {
      if (!dirty) return
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', onLeave)
    return () => window.removeEventListener('beforeunload', onLeave)
  }, [dirty])

  const save = useMutation({
    mutationFn: saveContent,
    onSuccess: (data) => {
      queryClient.setQueryData(contentKey, data)
      setNotice(t('saved'))
    },
  })

  function restore() {
    const next = resetContent()
    queryClient.setQueryData(contentKey, next)
    setNotice(t('reset'))
  }

  const links = [
    ['business', t('business')],
    ['services', t('services')],
    ['projects', t('projects')],
    ['reviews', t('reviews')],
  ] as const

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <button type="button" className="admin-menu" aria-expanded={navOpen} aria-label={navOpen ? t('close') : t('menu')} onClick={() => setNavOpen(!navOpen)}>
          {t('menu')}
        </button>
        <strong>Heritage Auto</strong>
        <a href="/">{t('viewSite')}</a>
        <button
          type="button"
          onClick={() => {
            signOut()
            navigate('/admin/login')
          }}
        >
          {t('logout')}
        </button>
      </header>
      <aside className={navOpen ? 'admin-side open' : 'admin-side'}>
        <nav aria-label={t('nav')}>
          {links.map(([path, label]) => (
            <NavLink key={path} to={`/admin/${path}`} onClick={() => setNavOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
        <button type="button" onClick={restore}>
          {t('reset')}
        </button>
        {dirty && <p className="admin-dirty">{t('dirty')}</p>}
        {notice && <p className="admin-note">{notice}</p>}
      </aside>
      <div className="admin-main">
        <Outlet context={{ content, save: (next: SiteContent) => save.mutate(next), saving: save.isPending }} />
      </div>
    </div>
  )
}

export type AdminOutlet = {
  content: SiteContent
  save: (next: SiteContent) => void
  saving: boolean
}
