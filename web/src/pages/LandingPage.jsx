import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { Navbar } from '../components/Navbar'

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

export function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)

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
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: 'radial-gradient(at 50% 11%, #d4f5d4 0px, transparent 70%), #fffbf4' }}
      />

      <Navbar isLoaded={isLoaded} />

      <div className="relative z-10 flex items-center justify-center h-screen">
        <div className={`text-center px-4 -mt-24 md:-mt-32 transition-all duration-700 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-inter font-normal text-black mb-10 leading-tight">
            Your <span className="px-0.5 rounded" style={{ backgroundColor: 'rgba(0, 168, 107, 0.4)', paddingTop: 0, paddingBottom: 0, lineHeight: '1.2' }}>All in One</span> Guide to Learning{' '}
            <br />
            <AnimatedWord words={['Mandarin', '中文', 'The most spoken language in the world', '普通话', '国语', '汉语']} />
          </h2>
          <p className="text-center text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Master consuming native level Chinese content. Learn the modern way to memorize vocabulary. Build an impenetrable workflow. For absolutely free.
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
        废寝忘食 凿壁偷光 败走麦城
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 md:w-8 md:h-8 text-black opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}
