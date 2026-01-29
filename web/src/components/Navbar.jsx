import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Navbar({ isLoaded = true }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const transition = 'transition-all duration-700 ease-out'
  const loading = isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
  const loadingLogo = isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <nav className={`relative z-10 flex items-center justify-between w-full px-8 md:px-12 lg:px-20 pt-8 md:pt-10 lg:pt-12 pb-6 text-black ${transition} ${loading}`}>
      <div className="w-20 md:w-24" aria-hidden />

      <div className={`absolute left-1/2 transform -translate-x-1/2 pt-2 md:pt-4 ${transition} delay-200 ${loadingLogo}`}>
        <Link to="/">
          <img src="/logo.png" alt="GuanYu Project Logo" className="h-16 md:h-20 lg:h-24 w-auto" />
        </Link>
      </div>

      <div className="flex items-center gap-6 font-lato text-sm uppercase tracking-wider">
        {user ? (
          <>
            <span className="normal-case opacity-80">{user.username}</span>
            <button type="button" onClick={handleLogout} className="hover:opacity-80 transition-opacity">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:opacity-80 transition-opacity">Login</Link>
            <Link to="/signup" className="hover:opacity-80 transition-opacity">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}
