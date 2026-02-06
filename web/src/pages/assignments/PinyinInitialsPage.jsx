import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { PageNavbar } from '../../components/PageNavbar'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../api'

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const ASSIGNMENT_SLUG = 'pinyin-initials'

export function PinyinInitialsPage({ embedded = false }) {
  const { user } = useAuth()
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [statusLoading, setStatusLoading] = useState(true)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    if (!user) {
      setStatusLoading(false)
      return
    }
    api.getAssignmentCompletionStatus(ASSIGNMENT_SLUG)
      .then(({ completed: isComplete }) => setCompleted(isComplete))
      .catch(() => setCompleted(false))
      .finally(() => setStatusLoading(false))
  }, [user])

  async function handleMarkDone() {
    if (!user) return
    setLoading(true)
    setSaveError('')
    try {
      await api.markAssignmentComplete(ASSIGNMENT_SLUG)
      setCompleted(true)
      // Small confetti blast
      confetti({
        particleCount: 28,
        spread: 36,
        startVelocity: 24,
        origin: { y: 0.6 },
        colors: ['#00a86b', '#d4f5d4', '#fffbf4', '#2d5016'],
      })
    } catch (err) {
      console.error('Failed to mark complete:', err)
      setSaveError(err.message || 'Couldn’t save progress. Try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleMarkNotDone() {
    if (!user) return
    setLoading(true)
    setSaveError('')
    try {
      await api.unmarkAssignmentComplete(ASSIGNMENT_SLUG)
      setCompleted(false)
    } catch (err) {
      console.error('Failed to mark not done:', err)
      setSaveError(err.message || 'Couldn’t update progress. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const content = (
    <div className="px-8 md:px-12 lg:px-20 pt-8 pb-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-rethink text-3xl md:text-4xl lg:text-5xl text-black mb-12 text-center">
          Initials (Consonants)
        </h1>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="font-rethink text-black/80 text-center leading-relaxed max-w-xl">
            {LOREM}
          </p>

          <div className="mt-10">
            {!user ? (
              <Link
                to="/login"
                className="inline-block px-5 py-2.5 rounded-lg font-rethink text-sm text-white transition-all duration-200 hover:scale-105 hover:shadow-md"
                style={{ backgroundColor: 'rgba(0, 168, 107, 0.9)' }}
              >
                Sign in to save progress
              </Link>
            ) : statusLoading ? (
              <span className="font-rethink text-black/60 text-sm">Loading…</span>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={completed ? handleMarkNotDone : handleMarkDone}
                  disabled={loading}
                  className="inline-block px-5 py-2.5 rounded-lg font-rethink text-sm text-white transition-all duration-200 hover:scale-105 hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                  style={{ backgroundColor: completed ? 'rgba(0, 168, 107, 0.9)' : 'rgba(0, 168, 107, 0.9)' }}
                >
                  {completed ? 'Lesson Completed' : 'Mark This Assignment Complete'}
                </button>
                {saveError && (
                  <p className="font-rethink text-sm text-red-600" role="alert">{saveError}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  if (embedded) return content

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full min-h-full"
        style={{ background: 'radial-gradient(at 50% 11%, #d4f5d4 0px, transparent 70%), #fffbf4' }}
      />
      <PageNavbar />
      <div className="relative z-10">{content}</div>
    </div>
  )
}
