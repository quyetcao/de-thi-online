// import { Routes, Route, Navigate } from 'react-router-dom'
// import HeaderListDS from '../component/page/listdsnganh/headerlistds'
// import HeaderListBacHoc from '../component/page/bachoc/headerbachoc'
// import HomePage from '../component/page/trangchu/pagehome'
// import ListDeThiTheoBacHoc from '../component/page/dethi/listdsdethi'
// import NotFound from '../component/page/notfound/notfound'
// import Login from '../component/page/user/login'
// import Register from '../component/page/user/register'

// import { useAuth } from '../context/AuthContext'
// import AdminDashboard from '../component/admin/AdminDashboard'
// import Profile from '../component/page/user/Profile'

// import ExamDetail from '../component/page/dethi/examDetail'
// import ExamTaking from '../component/page/dethi/ExamTaking'

// function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useAuth()

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }

//   return children
// }

// function AdminRoute({ children }) {
//   const { user, isAuthenticated } = useAuth()

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }

//   if (user?.role !== 'admin') {
//     return <Navigate to="/" replace />
//   }

//   return children
// }


// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/ho-so" element={<Profile />} />
//        <Route
//         path="/"
//         element={<HomePage />}
//       />
//         <Route
//         path="/nganh-hoc"
//         element={<HeaderListDS />}
//       />
//             <Route
//         path="/bac-hoc/:sectorId"
//         element={<HeaderListBacHoc />}
//       />
//       <Route
//         path="/danh-sach-dt/:levelId"
//         element={
//        <ProtectedRoute>
//         <ListDeThiTheoBacHoc />
//         </ProtectedRoute>
//    }
//       />
//       <Route
//   path="/de-thi/:id"
//   element={
//     <ProtectedRoute>
//       <ExamDetail />
//     </ProtectedRoute>
//   }
// />
// <Route
//   path="/lam-bai/:attemptId"
//   element={
//     <ProtectedRoute>
//       <ExamTaking />
//     </ProtectedRoute>
//   }
// />
//        <Route
//     path="*"
//     element={<NotFound />}
//   />
//       {/* <Route
//         path="/danh-sach-de-thi"
//         element={<ExamListPage />}
//       />

//       <Route
//         path="/de-thi/:id"
//         element={<ExamDetailPage />}
//       /> */}

//        <Route
//         path="/login"
//         element={<Login />}
//       />
//        <Route
//         path="/register"
//         element={<Register />}
//       />

//        <Route
//         path="/admin"
//         element={
//           <AdminRoute>
//             <AdminDashboard />
//           </AdminRoute>
//         }
//       />
//     </Routes>
//   )
// }


import { Routes, Route, Navigate } from 'react-router-dom'

import HeaderListDS from '../component/page/listdsnganh/headerlistds'
import HeaderListBacHoc from '../component/page/bachoc/headerbachoc'
import HomePage from '../component/page/trangchu/pagehome'
import ListDeThiTheoBacHoc from '../component/page/dethi/listdsdethi'
import NotFound from '../component/page/notfound/notfound'
import Login from '../component/page/user/login'
import Register from '../component/page/user/register'
import Profile from '../component/page/user/Profile'

import ExamDetail from '../component/page/dethi/examDetail'
import ExamTaking from '../component/page/dethi/ExamTaking'

import { useAuth } from '../context/AuthContext'

// Admin components
import AdminLayout from '../component/admin/layout/AdminLayout'
import Dashboard from '../component/admin/dashboard/Dashboard'
import AdminSection from '../component/admin/AdminSection'

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
      {/* Trang người dùng */}
      <Route path="/" element={<HomePage />} />

      <Route path="/nganh-hoc" element={<HeaderListDS />} />

      <Route
        path="/bac-hoc/:sectorId"
        element={<HeaderListBacHoc />}
      />

      <Route
        path="/danh-sach-dt/:levelId"
        element={
          <ProtectedRoute>
            <ListDeThiTheoBacHoc />
          </ProtectedRoute>
        }
      />

      <Route
        path="/de-thi/:id"
        element={
          <ProtectedRoute>
            <ExamDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lam-bai/:attemptId"
        element={
          <ProtectedRoute>
            <ExamTaking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ho-so"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Khu vực quản trị */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route
          path="general"
          element={
            <AdminSection
              title="Quản lý chung"
              description="Cấu hình hệ thống DETHIONLINE"
            />
          }
        />

        <Route
          path="banners"
          element={
            <AdminSection
              title="Quản lý banner"
              description="Quản lý hình ảnh và banner trang chủ"
            />
          }
        />

        <Route
          path="users"
          element={
            <AdminSection
              title="Quản lý người dùng"
              description="Quản lý tài khoản và thông tin người dùng"
            />
          }
        />

        <Route
          path="posts"
          element={
            <AdminSection
              title="Quản lý bài viết"
              description="Quản lý nội dung và tin tức website"
            />
          }
        />

        <Route
          path="sectors"
          element={
            <AdminSection
              title="Quản lý ngành học"
              description="Quản lý các ngành Oanh, Thiếu, Thanh"
            />
          }
        />

        <Route
          path="levels"
          element={
            <AdminSection
              title="Quản lý bậc học"
              description="Quản lý các bậc học thuộc từng ngành"
            />
          }
        />

        <Route
          path="exams"
          element={
            <AdminSection
              title="Quản lý đề thi"
              description="Quản lý đề thi và ngân hàng câu hỏi"
            />
          }
        />

        <Route
          path="scores"
          element={
            <AdminSection
              title="Quản lý điểm"
              description="Quản lý điểm thi và lịch sử làm bài"
            />
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
