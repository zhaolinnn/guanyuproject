import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'

function CourseProgressCircle({ completed, total, size = 44 }) {
  if (total === 0) return null
  const r = (size - 6) / 2
  const circumference = 2 * Math.PI * r
  const progress = Math.min(1, completed / total)
  const strokeDashoffset = circumference * (1 - progress)
  return (
    <svg width={size} height={size} className="flex-shrink-0" aria-hidden>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="3"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgb(0, 168, 107)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-[stroke-dashoffset] duration-500 ease-out"
      />
    </svg>
  )
}

/**
 * Reusable courses sidebar: course list with expandable assignments and progress.
 * Use on the courses page and on every assignment page for consistent navigation.
 */
export function CoursesSidebar() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [courseProgress, setCourseProgress] = useState({})
  const [courseDetails, setCourseDetails] = useState({})
  const [completedIds, setCompletedIds] = useState(new Set())
  const [sidebarFilter, setSidebarFilter] = useState('')
  const [expandedCourseSlug, setExpandedCourseSlug] = useState(null)

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

  useEffect(() => {
    if (courses.length === 0) {
      setCourseProgress({})
      setCourseDetails({})
      return
    }
    async function loadDetailsAndProgress() {
      try {
        const [completionsRes, ...details] = await Promise.all([
          user ? api.getCompletions() : { completions: [] },
          ...courses.map((c) => api.getCourseBySlug(c.slug)),
        ])
        const completed = new Set((completionsRes.completions || []).map((c) => c.assignment_id))
        setCompletedIds(completed)
        const progress = {}
        const detailsMap = {}
        courses.forEach((course, i) => {
          const courseData = details[i]?.course
          const assignments = courseData?.assignments ?? []
          detailsMap[course.slug] = { assignments }
          progress[course.slug] = {
            total: assignments.length,
            completed: assignments.filter((a) => completed.has(a.id)).length,
          }
        })
        setCourseProgress(progress)
        setCourseDetails(detailsMap)
      } catch (err) {
        console.error('Failed to load progress:', err)
        setCourseProgress({})
        setCourseDetails({})
      }
    }
    loadDetailsAndProgress()
  }, [user, courses])

  return (
    <aside className="w-full md:w-72 lg:w-80 flex-shrink-0 flex flex-col border-r border-black/10 bg-white min-h-[50vh] md:min-h-[calc(100vh-5rem)]">
      <div className="p-4 border-b border-black/10">
        <h2 className="font-rethink text-sm font-semibold text-black/80 uppercase tracking-wider">
          Courses
        </h2>
        <input
          type="search"
          placeholder="Filter courses..."
          value={sidebarFilter}
          onChange={(e) => setSidebarFilter(e.target.value)}
          className="mt-3 w-full px-3 py-2 rounded-lg bg-black/5 border border-black/10 text-black placeholder-black/40 font-rethink text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50"
          aria-label="Filter courses"
        />
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {error ? (
          <p className="font-rethink text-sm text-red-600 px-2">{error}</p>
        ) : !loading && courses.length === 0 ? (
          <p className="font-rethink text-sm text-black/50 px-2">No courses yet.</p>
        ) : (() => {
          const q = sidebarFilter.trim().toLowerCase()
          const filtered = q
            ? courses.filter(
                (c) =>
                  c.title?.toLowerCase().includes(q) ||
                  c.description?.toLowerCase().includes(q)
              )
            : courses
          return filtered.length === 0 ? (
            <p className="font-rethink text-sm text-black/50 px-2">No courses match.</p>
          ) : (
            <ul className="space-y-0.5">
              {filtered.map((course) => {
                const isExpanded = expandedCourseSlug === course.slug
                const assignments = courseDetails[course.slug]?.assignments ?? []
                return (
                  <li key={course.slug} className="rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 rounded-lg">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedCourseSlug((s) => (s === course.slug ? null : course.slug))
                        }
                        className="flex-shrink-0 p-1.5 rounded text-black/50 hover:bg-black/5 hover:text-black transition-colors"
                        aria-expanded={isExpanded}
                        aria-label={
                          isExpanded ? 'Collapse assignments' : 'Expand assignments'
                        }
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                      <Link
                        to="/courses"
                        className="flex-1 flex items-center gap-3 min-w-0 rounded-lg px-2 py-2.5 text-left font-rethink text-sm text-black/85 hover:bg-black/5 transition-colors"
                      >
                        {user && courseProgress[course.slug] && (
                          <CourseProgressCircle
                            completed={courseProgress[course.slug].completed}
                            total={courseProgress[course.slug].total}
                            size={32}
                          />
                        )}
                        <span className="flex-1 min-w-0 truncate">{course.title}</span>
                      </Link>
                    </div>
                    {isExpanded && assignments.length > 0 && (
                      <ul className="ml-6 pl-4 border-l border-black/10 space-y-0.5 py-1">
                        {assignments.map((assignment) => (
                          <li key={assignment.id}>
                            <Link
                              to={`/courses/${course.slug}/${assignment.slug}`}
                              className="flex items-center gap-2 rounded-lg px-2 py-2 font-rethink text-sm text-black/70 hover:bg-black/5 hover:text-black transition-colors"
                            >
                              {user && (
                                <CourseProgressCircle
                                  completed={completedIds.has(assignment.id) ? 1 : 0}
                                  total={1}
                                  size={24}
                                />
                              )}
                              <span className="flex-1 min-w-0 truncate">
                                {assignment.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          )
        })()}
      </nav>
    </aside>
  )
}
