import { Routes, Route, Navigate } from 'react-router-dom'
import HeaderListDS from '../component/page/listdsnganh/headerlistds'


export default function AppRoutes() {
  return (
    <Routes>
        <Route
        path="/bac-hoc"
        element={<HeaderListDS />}
      />
      {/* <Route
        path="/danh-sach-de-thi"
        element={<ExamListPage />}
      />

      <Route
        path="/de-thi/:id"
        element={<ExamDetailPage />}
      /> */}
    </Routes>
  )
}
