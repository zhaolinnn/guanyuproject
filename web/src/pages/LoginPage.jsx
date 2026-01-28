import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export function LoginPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full min-h-full"
        style={{ background: 'radial-gradient(at 50% 11%, #d4f5d4 0px, transparent 70%), #fffbf4' }}
      />
      <Navbar />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-24">
        <p className="font-lato text-black/70">
          Log in — coming soon. <Link to="/signup" className="underline" style={{ color: 'rgb(0, 168, 107)' }}>Sign up</Link> to get started.
        </p>
      </div>
    </div>
  )
}
