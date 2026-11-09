import logo from '../../assets/heritage-logo.png'
import { useTranslation } from 'react-i18next'

export default function Logo({ className = '' }: { className?: string }) {
  const { t } = useTranslation('common')
  return (
    <a href="#home" className={`logo ${className}`.trim()} aria-label={t('homeLabel')}>
      <img src={logo} alt="" />
    </a>
  )
}
