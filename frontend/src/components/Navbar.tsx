import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logout } from '../features/auth/authSlice'
import { Theme, applyTheme, getInitialTheme, setTheme } from '../theme/theme'

export default function Navbar() {
  const { token } = useAppSelector((s) => s.auth)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme())

  useEffect(() => { applyTheme(theme) }, [theme])
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setThemeState(next)
    setTheme(next)
  }

  return (
    <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={token ? '/dashboard' : '/login'} className="font-semibold text-lg">PassGen</Link>
        <div className="flex gap-3 items-center">
          <button onClick={toggleTheme} className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800">
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          {!token ? (
            <div className="flex gap-2">
              <Link className={`px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${location.pathname === '/login' ? 'font-semibold' : ''}`} to="/login">Login</Link>
              <Link className={`px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700`} to="/signup">Sign up</Link>
            </div>
          ) : (
            <button
              onClick={() => dispatch(logout())}
              className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >Logout</button>
          )}
        </div>
      </nav>
    </header>
  )
}
