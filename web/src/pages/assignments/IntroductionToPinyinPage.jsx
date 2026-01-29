import { Link, useParams } from 'react-router-dom'
import { PageNavbar } from '../../components/PageNavbar'

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export function IntroductionToPinyinPage() {
  const { courseSlug } = useParams()

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full min-h-full"
        style={{ background: 'radial-gradient(at 50% 11%, #d4f5d4 0px, transparent 70%), #fffbf4' }}
      />
      <PageNavbar />
      <div className="relative z-10 px-8 md:px-12 lg:px-20 pt-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <Link
            to={courseSlug ? `/courses/${courseSlug}` : '/courses'}
            className="font-rethink text-sm text-black/70 hover:opacity-80 mb-6 inline-block"
          >
            ← Back to course
          </Link>
          <h1 className="font-rethink text-3xl md:text-4xl lg:text-5xl text-black mb-12 text-center">
            Introduction to Pinyin
          </h1>
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="font-rethink text-black/80 text-center leading-relaxed max-w-xl">
              {LOREM}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
