import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { signIn } from './auth'
import './admin.css'

export default function LoginPage() {
  const { i18n } = useTranslation()
  const t = i18n.getFixedT('en', 'admin')
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  return (
    <main className="admin-login">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (!signIn(password)) {
            setError(true)
            return
          }
          navigate('/admin/business')
        }}
      >
        <h1>{t('loginTitle')}</h1>
        <label>
          {t('password')}
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error && <p>{t('badPassword')}</p>}
        <button type="submit">{t('enter')}</button>
      </form>
    </main>
  )
}
