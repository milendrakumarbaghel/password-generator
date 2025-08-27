export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

export const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (saved) return saved
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

export const setTheme = (theme: Theme) => {
  localStorage.setItem(STORAGE_KEY, theme)
  applyTheme(theme)
}
