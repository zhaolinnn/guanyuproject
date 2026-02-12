import { Outlet } from 'react-router-dom'
import { PageNavbar } from './PageNavbar'
import { CoursesSidebar } from './CoursesSidebar'

/**
 * Layout for course/assignment pages: navbar + courses sidebar + main content.
 * Used as the parent route for /courses so the sidebar stays mounted and state persists.
 */
export function CoursesLayout() {
  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden">
      <PageNavbar />

      <div className="relative flex-1 flex min-h-0 overflow-hidden">
        <CoursesSidebar />
        <main className="relative flex-1 min-w-0 overflow-y-auto flex flex-col bg-[#fffbf4]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
