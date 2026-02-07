import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CompletionsProvider } from './context/CompletionsContext'
import { LandingPage } from './pages/LandingPage'
import { SignUpPage } from './pages/SignUpPage'
import { LoginPage } from './pages/LoginPage'
import { CoursesLayout } from './components/CoursesLayout'
import { CoursesPage } from './pages/CoursesPage'
import { AssignmentRouter } from './pages/AssignmentRouter'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CompletionsProvider>
          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/courses" element={<CoursesLayout />}>
            <Route index element={<CoursesPage />} />
            <Route path=":courseSlug" element={<Navigate to="/courses" replace />} />
            <Route path=":courseSlug/:assignmentSlug" element={<AssignmentRouter />} />
          </Route>
          </Routes>
        </CompletionsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
