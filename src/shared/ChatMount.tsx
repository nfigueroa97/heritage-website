import { useEffect } from 'react'

export function ChatMount() {
  const src = import.meta.env.VITE_CHAT_SRC
  useEffect(() => {
    if (!src || document.getElementById('heritage-chat')) return
    const mount = () => {
      const script = document.createElement('script')
      script.id = 'heritage-chat'
      script.async = true
      script.src = src
      document.body.appendChild(script)
    }
    const idle = window.requestIdleCallback(mount)
    return () => window.cancelIdleCallback(idle)
  }, [src])
  return null
}
