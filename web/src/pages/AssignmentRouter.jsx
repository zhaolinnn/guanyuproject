import { useParams } from 'react-router-dom'
import { GettingStartedPage } from './assignments/GettingStartedPage'
import { IntroductionToPinyinPage } from './assignments/IntroductionToPinyinPage'
import { PinyinInitialsPage } from './assignments/PinyinInitialsPage'

/**
 * Renders the correct assignment page by slug. Add new assignment pages here.
 * Layout (navbar + sidebar) is provided by the parent route so sidebar state persists.
 */
export function AssignmentRouter() {
  const { courseSlug, assignmentSlug } = useParams()

  if (courseSlug === 'introduction' && assignmentSlug === 'introduction-getting-started') {
    return <GettingStartedPage embedded />
  }
  if (courseSlug === 'pinyin' && assignmentSlug === 'pinyin-intro') {
    return <IntroductionToPinyinPage embedded />
  }
  if (courseSlug === 'pinyin' && assignmentSlug === 'pinyin-initials') {
    return <PinyinInitialsPage embedded />
  }

  // No dedicated page yet — show placeholder.
  return (
    <div className="px-8 md:px-12 lg:px-20 pt-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="font-rethink text-black/60 text-center">
              This assignment doesn’t have a page yet. Coming soon.
            </p>
          </div>
        </div>
      </div>
  )
}
