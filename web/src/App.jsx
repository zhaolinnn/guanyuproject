import { useState, useEffect } from 'react'

// Function to detect if text contains Chinese characters
function hasChinese(text) {
  return /[\u4e00-\u9fff]/.test(text)
}

function AnimatedWord({ words, className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
        setIsVisible(true)
      }, 300) // Half of transition duration
    }, 3000) // Change word every 3 seconds

    return () => clearInterval(interval)
  }, [words.length])

  const currentWord = words[currentIndex]
  const isChinese = hasChinese(currentWord)

  return (
    <span 
      className={`inline-block transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} ${isChinese ? 'font-zhimangxing' : 'italic'} rounded-underline`}
      style={{ 
        transitionDuration: '600ms',
        fontFamily: isChinese ? 'ZhiMangXing' : undefined
      }}
    >
      {currentWord}
    </span>
  )
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animation after a brief delay to ensure smooth start
    setTimeout(() => {
      setIsLoaded(true)
    }, 100)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(at 50% 11%, #d4f5d4 0px, transparent 70%), #fffbf4'
        }}
      />

      {/* Navigation Bar */}
      <nav className={`relative z-10 flex items-center justify-between w-full px-8 md:px-12 lg:px-20 pt-8 md:pt-10 lg:pt-12 pb-6 text-black transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Left: Menu */}
        <button className="flex items-center gap-2 font-lato text-sm uppercase tracking-wider hover:opacity-80 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>MENU</span>
        </button>

        {/* Center: Logo/Title */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 pt-2 md:pt-4 transition-all duration-700 ease-out delay-200 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <img 
            src="/logo.png" 
            alt="GuanYu Project Logo" 
            className="h-16 md:h-20 lg:h-24 w-auto"
          />
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-6 font-lato text-sm uppercase tracking-wider">
          <a href="#" className="hover:opacity-80 transition-opacity">Login</a>
          <a href="#" className="hover:opacity-80 transition-opacity">Sign Up</a>
        </div>
      </nav>

      {/* Main Content - Centered */}
      <div className="relative z-10 flex items-center justify-center h-screen">
        <div className={`text-center px-4 -mt-24 md:-mt-32 transition-all duration-700 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-inter font-normal text-black mb-6 leading-tight">
            Your <span className="px-0.5 rounded" style={{ backgroundColor: 'rgba(0, 168, 107, 0.4)', paddingTop: '0', paddingBottom: '0', lineHeight: '1.2' }}>All in One</span> Guide to Learning 
            <br />
            <AnimatedWord 
              words={['Mandarin', '中文', 'The most spoken language in the world', '普通话', '国语', '汉语']} 
            />
          </h2>
        </div>
      </div>

      {/* Bottom Left Chinese Text */}
      <div 
        className="absolute bottom-8 left-8 md:bottom-12 md:left-5 z-10 font-zhimangxing text-2xl md:text-3xl lg:text-4xl text-black"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
          opacity: 0.15,
          letterSpacing: '0.2em'
        }}
      >
        废寝忘食
        凿壁偷光
        败走麦城
        
      </div>

      {/* Scroll Indicator Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg 
          className="w-6 h-6 md:w-8 md:h-8 text-black opacity-60"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </div>
  )
}

export default App
