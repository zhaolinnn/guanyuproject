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
          className="relative flex-1 min-w-0 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-8 md:py-8"
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
              Unlock your Mandarin
            </h1>
            <p>
              Access the courses and assignments on the left sidebar!
            </p>
          </div>
          <div className="flex flex-row flex-wrap gap-6 items-start pt-12">
            {/* Yunnan image */}
            <div className="w-full md:w-96 md:flex-shrink-0 flex flex-col items-center md:items-start">
              <div
                className="aspect-[3/4] w-full max-w-[320px] md:max-w-none md:w-96 rounded-2xl overflow-hidden bg-[#e8ebe8]"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1568005508084-d289b79374f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)',
                }}
                role="img"
                aria-label="Yunnan landscape"
              />
              <p className="font-rethink text-sm text-black/50 mt-3">
                Yunnan, China 云南
              </p>
            </div>
            {/* Second image - replace URL and caption as needed */}
            <div className="w-full md:w-96 md:flex-shrink-0 flex flex-col items-center md:items-start pl-8">
              <div
                className="aspect-[3/4] w-full max-w-[320px] md:max-w-none md:w-96 rounded-2xl overflow-hidden bg-[#e8ebe8]"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1616680687799-ea36d6fb2173?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)',
                }}
                role="img"
                aria-label="Shanghai city skyline"
              />
              <p className="font-rethink text-sm text-black/50 mt-3">
                Shanghai, China 上海
              </p>
            </div>
          </div>
          
        </main>
      </div>
    </div>
  )
}
