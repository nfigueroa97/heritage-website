const KEY = 'heritage-admin'

export function adminPassword() {
  return import.meta.env.VITE_ADMIN_PASSWORD || 'heritage'
}

export function isAdmin() {
  return sessionStorage.getItem(KEY) === '1'
}

export function signIn(password: string) {
  if (password !== adminPassword()) return false
  sessionStorage.setItem(KEY, '1')
  return true
}

export function signOut() {
  sessionStorage.removeItem(KEY)
}
