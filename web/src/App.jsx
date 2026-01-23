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
      <nav className="relative z-10 flex items-center justify-between w-full px-8 md:px-12 lg:px-20 pt-8 md:pt-10 lg:pt-12 pb-6 text-black">
        {/* Left: Menu */}
        <button className="flex items-center gap-2 font-lato text-sm uppercase tracking-wider hover:opacity-80 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>MENU</span>
        </button>

        {/* Center: Logo/Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 pt-2 md:pt-4">
          <img 
            src="/logo.png" 
            alt="GuanYu Project Logo" 
            className="h-16 md:h-20 lg:h-24 w-auto"
          />
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-6 font-lato text-sm uppercase tracking-wider">
          <a href="#" className="hover:opacity-80 transition-opacity">AVAILABILITY</a>
          <a href="#" className="hover:opacity-80 transition-opacity">CONTACT</a>
        </div>
      </nav>

      {/* Main Content - Centered */}
      <div className="relative z-10 flex items-center justify-center h-screen">
        <div className="text-center px-4 -mt-24 md:-mt-32">
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-inter font-normal text-black mb-6 leading-tight">
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
