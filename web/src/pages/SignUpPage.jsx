import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { PageNavbar } from '../components/PageNavbar'

export function SignUpPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (username.trim().length < 2) {
      setError('Username must be at least 2 characters')
      return
    }

    const emailTrimmed = email.trim()
    if (!emailTrimmed) {
      setError('Email is required')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      setError('Please enter a valid email address')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    try {
      await api.signup({
        username: username.trim(),
        password,
        email: emailTrimmed,
        name: name.trim() || undefined,
      })
      navigate('/', { state: { signedUp: true } })
    } catch (err) {
      setError(err.message || 'Something went wrong')
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

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-12 pb-12">
        <div className="w-full max-w-md">
          <h1 className="font-lato text-2xl md:text-3xl uppercase tracking-wider text-black mb-2 text-center">
            Create an account
          </h1>
          <p className="font-lato text-sm text-black/70 mb-8 text-center">
            Start your learning journey
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
              minLength={2}
              className="w-full mb-4 px-4 py-2.5 rounded-lg border border-black/15 bg-white font-lato text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[rgba(0,168,107,0.5)] focus:border-[rgba(0,168,107,0.6)]"
              placeholder="Choose a username"
              autoComplete="username"
            />

            <label className="block font-lato text-sm uppercase tracking-wider text-black/80 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mb-4 px-4 py-2.5 rounded-lg border border-black/15 bg-white font-lato text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[rgba(0,168,107,0.5)] focus:border-[rgba(0,168,107,0.6)]"
              placeholder="you@example.com"
              autoComplete="email"
            />

            <label className="block font-lato text-sm uppercase tracking-wider text-black/80 mb-1">
              Name <span className="normal-case text-black/50">(optional)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-4 px-4 py-2.5 rounded-lg border border-black/15 bg-white font-lato text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[rgba(0,168,107,0.5)] focus:border-[rgba(0,168,107,0.6)]"
              placeholder="Your name"
              autoComplete="name"
            />

            <label className="block font-lato text-sm uppercase tracking-wider text-black/80 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full mb-4 px-4 py-2.5 rounded-lg border border-black/15 bg-white font-lato text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[rgba(0,168,107,0.5)] focus:border-[rgba(0,168,107,0.6)]"
              placeholder="At least 8 characters"
              autoComplete="new-password"
            />

            <label className="block font-lato text-sm uppercase tracking-wider text-black/80 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full mb-6 px-4 py-2.5 rounded-lg border border-black/15 bg-white font-lato text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[rgba(0,168,107,0.5)] focus:border-[rgba(0,168,107,0.6)]"
              placeholder="Repeat password"
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-lato text-sm uppercase tracking-wider text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'rgba(0, 168, 107, 0.9)' }}
            >
              {loading ? 'Creating account…' : 'Sign up'}
            </button>
          </form>

          <p className="mt-6 text-center font-lato text-sm text-black/70">
            Already have an account?{' '}
            <Link to="/login" className="underline hover:opacity-80" style={{ color: 'rgb(0, 168, 107)' }}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
