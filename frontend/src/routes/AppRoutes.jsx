import { Routes, Route, Navigate } from 'react-router-dom'
import HeaderListDS from '../component/page/listdsnganh/headerlistds'
import HeaderListBacHoc from '../component/page/bachoc/headerbachoc'
import HomePage from '../component/page/trangchu/pagehome'
import ListDeThiTheoBacHoc from '../component/page/dethi/listdsdethi'
import NotFound from '../component/page/notfound/notfound'
import Login from '../component/page/user/login'
import Register from '../component/page/user/register'

import { useAuth } from '../context/AuthContext'
import AdminDashboard from '../component/admin/AdminDashboard'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AdminRoute({ children }) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}


export default function AppRoutes() {
  return (
    <Routes>
       <Route
        path="/"
        element={<HomePage />}
      />
        <Route
        path="/nganh-hoc"
        element={<HeaderListDS />}
      />
            <Route
        path="/bac-hoc/:sectorId"
        element={<HeaderListBacHoc />}
      />
      <Route
        path="/danh-sach-dt/:levelId"
        element={<ListDeThiTheoBacHoc />}
      />
       <Route
    path="*"
    element={<NotFound />}
  />
      {/* <Route
        path="/danh-sach-de-thi"
        element={<ExamListPage />}
      />

      <Route
        path="/de-thi/:id"
        element={<ExamDetailPage />}
      /> */}

       <Route
        path="/login"
        element={<Login />}
      />
       <Route
        path="/register"
        element={<Register />}
      />

       <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  )
}
