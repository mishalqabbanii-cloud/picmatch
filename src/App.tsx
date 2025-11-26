import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { PhotographerProfilePage } from './pages/PhotographerProfilePage'
import { BookingFlowPage } from './pages/BookingFlowPage'
import { PaymentMockPage } from './pages/PaymentMockPage'
import { ChatPage } from './pages/ChatPage'
import { ClientDashboardPage } from './pages/ClientDashboardPage'
import { PhotographerDashboardPage } from './pages/PhotographerDashboardPage'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { ProtectedRoute } from './auth/ProtectedRoute'

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/photographers/:id" element={<PhotographerProfilePage />} />
          <Route path="/booking/:photographerId" element={<BookingFlowPage />} />
          <Route path="/payment/:bookingId" element={<PaymentMockPage />} />
          <Route path="/chat/:bookingId" element={<ChatPage />} />
          <Route
            path="/dashboard/client"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/photographer"
            element={
              <ProtectedRoute allowedRoles={['photographer']}>
                <PhotographerDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
