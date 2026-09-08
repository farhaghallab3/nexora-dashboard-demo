import { createContext, useContext, useState, useCallback } from 'react'

const ThemeContext = createContext(null)

function applyDocumentTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('nexora-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const initial = getInitialTheme()
    applyDocumentTheme(initial)
    return initial
  })

  const setThemeAndPersist = useCallback((next) => {
    applyDocumentTheme(next)
    localStorage.setItem('nexora-theme', next)
    setTheme(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeAndPersist(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setThemeAndPersist])

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', setTheme: setThemeAndPersist, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
