import { useParams } from 'react-router-dom'
import { IntroductionToPinyinPage } from './assignments/IntroductionToPinyinPage'
import { PinyinInitialsPage } from './assignments/PinyinInitialsPage'
import { CoursesLayout } from '../components/CoursesLayout'

/**
 * Renders the correct assignment page by slug. Add new assignment pages here.
 * Each assignment is wrapped in CoursesLayout (navbar + sidebar + content).
 */
export function AssignmentRouter() {
  const { courseSlug, assignmentSlug } = useParams()

  if (courseSlug === 'pinyin' && assignmentSlug === 'pinyin-intro') {
    return (
      <CoursesLayout>
        <IntroductionToPinyinPage embedded />
      </CoursesLayout>
    )
  }
  if (courseSlug === 'pinyin' && assignmentSlug === 'pinyin-initials') {
    return (
      <CoursesLayout>
        <PinyinInitialsPage embedded />
      </CoursesLayout>
    )
  }

  // No dedicated page yet — show placeholder with same layout (sidebar + content).
  return (
    <CoursesLayout>
      <div className="px-8 md:px-12 lg:px-20 pt-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="font-rethink text-black/60 text-center">
              This assignment doesn’t have a page yet. Coming soon.
            </p>
          </div>
        </div>
      </div>
    </CoursesLayout>
  )
}
