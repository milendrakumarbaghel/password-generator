import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logout } from '../features/auth/authSlice'

export default function Navbar() {
  const { token } = useAppSelector((s) => s.auth)
  const dispatch = useAppDispatch()
  const location = useLocation()

  return (
    <header className="border-b bg-white">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={token ? '/dashboard' : '/login'} className="font-semibold text-lg">PassGen</Link>
        <div className="flex gap-3">
          {!token ? (
            <>
              <Link className={`px-3 py-1 rounded hover:bg-gray-100 ${location.pathname === '/login' ? 'font-semibold' : ''}`} to="/login">Login</Link>
              <Link className={`px-3 py-1 rounded hover:bg-gray-100 ${location.pathname === '/signup' ? 'font-semibold' : ''}`} to="/signup">Sign up</Link>
            </>
          ) : (
            <button
              onClick={() => dispatch(logout())}
              className="px-3 py-1 rounded bg-gray-900 text-white hover:bg-black"
            >Logout</button>
          )}
        </div>
      </nav>
    </header>
  )
}
