import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { IntroductionToPinyinPage } from './assignments/IntroductionToPinyinPage'

/**
 * Renders the correct assignment page by slug. Add new assignment pages here.
 * Each assignment can have its own page component under pages/assignments/.
 */
export function AssignmentRouter() {
  const { courseSlug, assignmentSlug } = useParams()

  if (courseSlug === 'pinyin' && assignmentSlug === 'pinyin-intro') {
    return <IntroductionToPinyinPage />
  }

  // No dedicated page yet — show placeholder. Add more cases above as you create pages.
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
        <div className="max-w-3xl mx-auto">
          <Link
            to={courseSlug ? `/courses/${courseSlug}` : '/courses'}
            className="font-sans text-sm text-black/70 hover:opacity-80 mb-6 inline-block"
          >
            ← Back to course
          </Link>
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="font-sans text-black/60 text-center">This assignment doesn’t have a page yet. Coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
