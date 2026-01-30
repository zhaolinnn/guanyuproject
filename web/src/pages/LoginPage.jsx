import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PageNavbar } from '../components/PageNavbar'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username.trim(), password)
      navigate('/courses')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full min-h-full"
        style={{ background: 'radial-gradient(at 50% 11%, #d4f5d4 0px, transparent 70%), #fffbf4' }}
      />
      <PageNavbar />
      <div className="relative z-10 flex items-start justify-center min-h-screen px-4 pt-20">
        <div className="w-full max-w-md">
          <h1 className="font-lato text-2xl md:text-3xl uppercase tracking-wider text-black mb-2 text-center">
            Log in
          </h1>
          <p className="font-lato text-sm text-black/70 mb-8 text-center">
            Use your username and password
          </p>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-6 md:p-8 shadow-lg border border-black/5 bg-white/80 backdrop-blur-sm"
          >
            {error && (
              <div
                className="mb-4 p-3 rounded-lg text-sm text-red-700 bg-red-50 border border-red-200"
                role="alert"
              >
                {error}
              </div>
            )}

            <label className="block font-lato text-sm uppercase tracking-wider text-black/80 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full mb-4 px-4 py-2.5 rounded-lg border border-black/15 bg-white font-lato text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[rgba(0,168,107,0.5)] focus:border-[rgba(0,168,107,0.6)]"
              placeholder="Your username"
            />

            <label className="block font-lato text-sm uppercase tracking-wider text-black/80 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full mb-6 px-4 py-2.5 rounded-lg border border-black/15 bg-white font-lato text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[rgba(0,168,107,0.5)] focus:border-[rgba(0,168,107,0.6)]"
              placeholder="Your password"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-lato text-sm uppercase tracking-wider text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'rgba(0, 168, 107, 0.9)' }}
            >
              {loading ? 'Logging in…' : 'Log in'}
            </button>
          </form>

          <p className="mt-6 text-center font-lato text-sm text-black/70">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="underline hover:opacity-80" style={{ color: 'rgb(0, 168, 107)' }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
