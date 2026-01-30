import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { Navbar } from '../components/Navbar'
import { PageNavbar } from '../components/PageNavbar'

function hasChinese(text) {
  return /[\u4e00-\u9fff]/.test(text)
}

function AnimatedWord({ words }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsVisible(true)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [words.length])

  const currentWord = words[currentIndex]
  const isChinese = hasChinese(currentWord)

  return (
    <span
      className={`inline-block transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} ${isChinese ? 'font-zhimangxing' : 'italic'} rounded-underline`}
      style={{ transitionDuration: '600ms', fontFamily: isChinese ? 'ZhiMangXing' : undefined }}
    >
      {currentWord}
    </span>
  )
}

const STICKY_NAV_SCROLL_THRESHOLD = 80

export function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showStickyNav, setShowStickyNav] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShowStickyNav(window.scrollY > STICKY_NAV_SCROLL_THRESHOLD)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
    api.healthCheck()
      .then((data) => console.log('✅ Backend connection successful!', data))
      .catch((err) => {
        console.error('❌ Backend connection failed:', err)
        console.log('💡 Make sure the backend server is running on http://localhost:3001')
      })
  }, [])

  return (
    <div className="relative min-h-screen w-full">
      {/* Sticky PageNavbar: appears when user scrolls, fixed at top */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ${showStickyNav ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!showStickyNav}
      >
        <PageNavbar />
      </div>

      {/* Hero: exactly one viewport height */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{ background: 'radial-gradient(at 50% 11%, #d4f5d4 0px, transparent 70%), #fffbf4' }}
        />

        <Navbar isLoaded={isLoaded} />

        <div className="relative z-10 flex items-center justify-center h-full">
        <div className={`text-center px-4 -mt-24 md:-mt-32 transition-all duration-700 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-inter font-normal text-black mb-10 leading-tight">
            Your <span className="px-0.5 rounded" style={{ backgroundColor: 'rgba(0, 168, 107, 0.4)', paddingTop: 0, paddingBottom: 0, lineHeight: '1.2' }}>All in One</span> Guide to Learning{' '}
            <br />
            <AnimatedWord words={['Mandarin Chinese', '中文', 'The most spoken language in the world', '普通话', '国语', '汉语']} />
          </h2>
          <p className="text-center text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Master consuming native-level Chinese content. Learn the modern way to memorize vocabulary. Build an impenetrable workflow. For absolutely free.
          </p>
          <Link
            to="/courses"
            className="inline-block px-5 py-2.5 md:px-6 md:py-3 text-lg md:text-xl font-medium text-white rounded-xl hover:opacity-95 transition-opacity"
            style={{ backgroundColor: 'rgb(0, 168, 107)', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
          >
            View Full Curriculum
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-8 md:bottom-12 md:left-5 z-10 font-zhimangxing text-2xl md:text-3xl lg:text-4xl text-black"
        style={{ writingMode: 'vertical-rl', textOrientation: 'upright', opacity: 0.15, letterSpacing: '0.2em' }}
      >
        废寝忘食 凿壁偷光 不怕慢，只怕站
      </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 md:w-8 md:h-8 text-black opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Second section: dark, image left / text right — below the fold */}
      <section className="relative w-full flex items-center bg-[#1a1f2e] py-16 md:py-20">
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="w-full md:w-1/2 flex-shrink-0">
            <div
              className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#252b3b]"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1729321518266-6383e689c3ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 20px 40px -12px rgba(0, 168, 107, 0.18), 0 0 0 1px rgba(0, 168, 107, 0.06)',
              }}
              role="img"
              aria-label="Language immersion"
            />
            <p className="font-rethink text-sm text-white/50 mt-3">
              Xinjiang, China 新疆
            </p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <p className="font-rethink text-2xl md:text-3xl lg:text-4xl text-white/95 leading-snug font-medium">
              The most modern way to learn a language is through{' '}
              <span className="px-0.5 rounded" style={{ backgroundColor: 'rgba(0, 168, 107, 0.4)', paddingTop: 0, paddingBottom: 0, lineHeight: '1.2' }}>immersion</span>
            </p>
          </div>
        </div>
      </section>

      {/* Third section: light, same gradient as hero — text left / image right (Zhangjiajie) */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{ background: 'radial-gradient(at 50% 11%, #d4f5d4 0px, transparent 70%), #fffbf4' }}
        />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-12 md:gap-12">
          <div className="w-full md:flex-1 md:min-w-0 md:pr-10 flex flex-col justify-center text-center md:text-left">
            <h2 className="font-rethink text-4xl md:text-5xl lg:text-6xl text-black mb-8 md:mb-10">
            What is immersion?
          </h2>
          <p className="font-rethink text-lg md:text-xl text-black/75 leading-relaxed">
            Immersion means surrounding yourself with the language you want to learn—through real content, everyday situations, and consistent practice. Instead of memorizing lists in isolation, you absorb vocabulary and grammar in context, the way native speakers do. It’s the most natural and effective path to fluency.
          </p>
          <br />
          <p className="font-rethink text-lg md:text-xl text-black/75 leading-relaxed">
            The biggest mistake people make when learning a language is regurgitating vocabulary and robotic sentence structures instead of using the language as a form of communication which is the foundation of any language.
          </p>
          <h2 className="font-rethink text-4xl md:text-5xl lg:text-6xl text-black mt-10 md:mt-12 mb-8 md:mb-10">
            What will you learn?
          </h2>
          <p className="font-rethink text-lg md:text-xl text-black/75 leading-relaxed">
            In these courses, you will learn how to use the language as a form of communication by sentence mining and getting a feel for how Mandarin is used in everyday life. In this way, you will learn to understand native-level speed and fluency which is often lacking in students who only learn in a classroom setting.
          </p>
          <br />
          </div>
          <div className="w-full md:w-96 md:flex-shrink-0 md:ml-auto flex flex-col items-center md:items-end">
            <div
              className="aspect-[3/4] w-full max-w-[320px] md:max-w-none md:w-96 rounded-2xl overflow-hidden bg-[#e8ebe8]"
              style={{
                backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/d/d4/Wulingyuan_3.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)',
              }}
              role="img"
              aria-label="Zhangjiajie landscape"
            />
            <p className="font-rethink text-sm text-black/50 mt-3">
              Zhangjiajie 张家界
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full bg-[#1a1f2e] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-20 flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-16">
          <div className="flex flex-col items-center md:items-start">
            <img src="/logo.png" alt="GuanYu Project" className="h-10 md:h-12 w-auto block" />
            <p className="font-rethink text-sm text-white/50 mt-4">
              © {new Date().getFullYear()} GuanYu Project. All rights reserved.
            </p>
          </div>
          <div className="md:max-w-md">
            <h3 className="font-rethink text-lg font-medium text-white/95 mb-2">About the Developer</h3>
            <p className="font-rethink text-sm text-white/60 leading-relaxed">
              Hey there, I'm Alan Liu 劉兆林. GuanYu Project 關羽 is built by a student for students. If you have feedback or want to get in touch, I’d love to hear from you.
            </p>
            <a
              href="https://github.com/zhaolinnn/guanyuproject"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 text-white/70 hover:text-white transition-colors"
              aria-label="Alan Liu on GitHub"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
