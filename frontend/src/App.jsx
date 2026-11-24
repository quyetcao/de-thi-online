
import './App.css'

import { AuthProvider } from './context/AuthContext'
import { useLocation } from 'react-router-dom'

import Header from './component/layout/Header'
import AppRoutes from './routes/AppRoutes'

function AppContent() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminPage && <Header />}
      <AppRoutes />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
