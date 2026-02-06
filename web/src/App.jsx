import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LandingPage } from './pages/LandingPage'
import { SignUpPage } from './pages/SignUpPage'
import { LoginPage } from './pages/LoginPage'
import { CoursesPage } from './pages/CoursesPage'
import { AssignmentRouter } from './pages/AssignmentRouter'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseSlug" element={<Navigate to="/courses" replace />} />
          <Route path="/courses/:courseSlug/:assignmentSlug" element={<AssignmentRouter />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
