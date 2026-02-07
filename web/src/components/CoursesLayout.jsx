import { Outlet } from 'react-router-dom'
import { PageNavbar } from './PageNavbar'
import { CoursesSidebar } from './CoursesSidebar'

/**
 * Layout for course/assignment pages: navbar + courses sidebar + main content.
 * Used as the parent route for /courses so the sidebar stays mounted and state persists.
 */
export function CoursesLayout() {
  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <PageNavbar />

      <div className="relative flex-1 flex min-h-0">
        <CoursesSidebar />
        <main
          className="relative flex-1 min-w-0 overflow-y-auto flex flex-col"
          style={{
            background:
              'radial-gradient(at 50% 11%, #d4f5d4 0px, transparent 70%), #fffbf4',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
