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
      className={`inline-block transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} ${isChinese ? 'font-chinese' : 'italic'} rounded-underline`}
      style={{ 
        transitionDuration: '600ms',
        fontFamily: isChinese ? 'Chinese' : undefined
      }}
    >
      {currentWord}
    </span>
  )
}

function App() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/background.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img 
            src="/background.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </video>
        {/* Overlay for better text readability (optional - adjust opacity as needed) */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between w-full px-8 md:px-12 lg:px-20 pt-8 md:pt-10 lg:pt-12 pb-6 text-white">
        {/* Left: Menu */}
        <button className="flex items-center gap-2 font-inter text-sm uppercase tracking-wider hover:opacity-80 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>MENU</span>
        </button>

        {/* Center: Logo/Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 pt-8 md:pt-23 flex items-center gap-1">
          <img 
            src="/logo.png" 
            alt="GuanYu Project Logo" 
            className="h-20 md:h-28 lg:h-32 w-auto"
          />
          <div className="flex flex-col text-white">
            <span className="font-inter text-xl md:text-2xl lg:text-3xl font-semibold underline decoration-green-500 decoration-2 underline-offset-2">Guan Yu</span>
            <span className="font-zhimangxing text-xl md:text-2xl lg:text-3xl font-semibold decoration-2 underline-offset-2">普通话</span>
            <span className="font-inter text-lg md:text-xl lg:text-2xl underline decoration-green-500 decoration-2 underline-offset-2">Project</span>
          </div>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-6 font-inter text-sm uppercase tracking-wider">
          <a href="#" className="hover:opacity-80 transition-opacity">AVAILABILITY</a>
          <a href="#" className="hover:opacity-80 transition-opacity">CONTACT</a>
        </div>
      </nav>

      {/* Main Content - Centered */}
      <div className="relative z-10 flex items-center justify-center h-screen">
        <div className="text-center px-4 -mt-24 md:-mt-32">
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-inter font-normal text-white mb-6 leading-tight">
            Your All in One Guide to Learning 
            <br />
            <AnimatedWord 
              words={['Mandarin', '中文', 'The most spoken language in the world', '普通话', '国语', '汉语']} 
            />
          </h2>
        </div>
      </div>
    </div>
  )
}

export default App
