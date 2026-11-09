type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

export function installAnalytics() {
  const id = import.meta.env.VITE_GA_ID
  if (!id || document.getElementById('ga-src')) return
  const script = document.createElement('script')
  script.id = 'ga-src'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(script)
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', id)
}

export function track(name: string, params?: Record<string, string>) {
  if (!import.meta.env.VITE_GA_ID) return
  window.gtag?.('event', name, params)
}
