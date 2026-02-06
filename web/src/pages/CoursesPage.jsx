import { PageNavbar } from '../components/PageNavbar'
import { CoursesSidebar } from '../components/CoursesSidebar'
import { useAuth } from '../context/AuthContext'

export function CoursesPage() {
  const { user } = useAuth()

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <PageNavbar />

      <div className="relative flex-1 flex min-h-0">
        <CoursesSidebar />

        {/* Main content: hero heading */}
        <main
          className="relative flex-1 min-w-0 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-12 md:py-16"
          style={{
            background:
              'radial-gradient(at 50% 11%, #d4f5d4 0px, transparent 70%), #fffbf4',
          }}
        >
          <div className="max-w-3xl">
            {user && (
              <p className="font-rethink text-lg md:text-xl text-black/70 mb-3">
                Welcome back, {user.name || user.username}
              </p>
            )}
            <h1 className="font-rethink text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-tight">
              Unlock your Mandarin Skills
            </h1>
          </div>
        </main>
      </div>
    </div>
  )
}
