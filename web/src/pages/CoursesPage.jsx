import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'

export function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadCourses() {
      try {
        const coursesData = await api.getCourses()
        setCourses(coursesData.courses || [])
      } catch (err) {
        console.error('Failed to load courses:', err)
        setError(err.message || 'Failed to load courses. Make sure the server is running.')
      } finally {
        setLoading(false)
      }
    }
    loadCourses()
  }, [])

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
          <h1 className="font-lato text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider text-black mb-8">
            Courses
          </h1>

          {loading ? (
            <div className="text-center py-12">
              <p className="font-lato text-black/60">Loading courses...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-lato text-black/60">No courses available yet.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-6">
              {courses.map((course) => (
                <Link
                  key={course.slug}
                  to={`/courses/${course.slug}`}
                  className="block rounded-2xl p-6 md:p-8 shadow-lg border border-black/10 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="font-lato text-xl md:text-2xl uppercase tracking-wider text-black mb-2">
                        {course.title}
                      </h2>
                      {course.description && (
                        <p className="font-lato text-sm text-black/70">{course.description}</p>
                      )}
                    </div>
                    <svg
                      className="w-6 h-6 text-black/40 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
