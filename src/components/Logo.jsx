import logo from '../assets/heritage-logo.png'

export default function Logo({ className = '' }) {
  return (
    <a href="#home" className={`logo ${className}`.trim()} aria-label="Heritage Auto, home">
      <img src={logo} alt="" />
    </a>
  )
}
