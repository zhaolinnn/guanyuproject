import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function PageNavbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <header className="relative z-10 flex items-center justify-between w-full px-8 md:px-12 lg:px-20 py-6 border-b border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.06)] bg-[#fffbf4]/80 backdrop-blur-sm">
      <div className="w-20 md:w-24" aria-hidden />

      <Link to="/" className="absolute left-1/2 -translate-x-1/2">
        <img src="/logo.png" alt="GuanYu Project" className="h-10 md:h-12 w-auto block" />
      </Link>

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
    </header>
  )
}
