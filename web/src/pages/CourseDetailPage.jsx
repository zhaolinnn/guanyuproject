import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api'

export function CourseDetailPage() {
  const { slug } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getCourseBySlug(slug)
        setCourse(data.course)
      } catch (err) {
        setError(err.message || 'Failed to load course')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full min-h-full" style={{ background: 'radial-gradient(at 50% 11%, #d4f5d4 0px, transparent 70%), #fffbf4' }} />
        <div className="relative z-10 flex justify-center pt-8 pb-4">
          <Link to="/"><img src="/logo.png" alt="GuanYu Project" className="h-14 md:h-16 w-auto" /></Link>
        </div>
        <div className="relative z-10 px-8 md:px-12 lg:px-20 pt-12 pb-12">
          <p className="font-lato text-black/60">Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full min-h-full" style={{ background: 'radial-gradient(at 50% 11%, #d4f5d4 0px, transparent 70%), #fffbf4' }} />
        <div className="relative z-10 flex justify-center pt-8 pb-4">
          <Link to="/"><img src="/logo.png" alt="GuanYu Project" className="h-14 md:h-16 w-auto" /></Link>
        </div>
        <div className="relative z-10 px-8 md:px-12 lg:px-20 pt-12 pb-12">
          <Link to="/courses" className="font-lato text-sm text-black/70 hover:opacity-80 mb-4 inline-block">← Back to courses</Link>
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">{error || 'Course not found'}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full min-h-full"
        style={{ background: 'radial-gradient(at 50% 11%, #d4f5d4 0px, transparent 70%), #fffbf4' }}
      />
      <div className="relative z-10 flex justify-center pt-8 pb-4">
        <Link to="/">
          <img src="/logo.png" alt="GuanYu Project" className="h-14 md:h-16 w-auto" />
        </Link>
      </div>
      <div className="relative z-10 px-8 md:px-12 lg:px-20 pt-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/courses" className="font-lato text-sm text-black/70 hover:opacity-80 mb-6 inline-block">← Back to courses</Link>
          <h1 className="font-lato text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider text-black mb-4">
            {course.title}
          </h1>
          {course.description && (
            <p className="font-lato text-lg text-black/70 mb-8">{course.description}</p>
          )}

          <h2 className="font-lato text-xl uppercase tracking-wider text-black mb-4">Assignments</h2>
          {course.assignments && course.assignments.length > 0 ? (
            <div className="grid gap-4">
              {course.assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="rounded-2xl p-6 shadow-lg border border-black/10 bg-white/90 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-lato text-lg uppercase tracking-wider text-black">
                      {assignment.title}
                    </h3>
                    <span className="font-lato text-sm text-black/50">Coming soon</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-lato text-black/60">No assignments yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
