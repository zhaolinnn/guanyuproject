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
      <Link to="/courses" className="flex items-center gap-2 font-lato text-sm uppercase tracking-wider hover:opacity-80 transition-opacity">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span>COURSES</span>
      </Link>

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
