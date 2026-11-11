import './App.css'
import Header from './component/layout/Header'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'
<style>
@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=National+Park:wght@200..800&family=Oswald:wght@200..700&family=Zeyada&display=swap');
</style>
function App() {
  return (
    <>
        <AuthProvider>
        <Header/>
        <AppRoutes />
        </AuthProvider>
    </>
  )
}

export default App
