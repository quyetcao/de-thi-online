import { Routes, Route, Navigate } from 'react-router-dom'
import HeaderListDS from '../component/page/listdsnganh/headerlistds'
import HeaderListBacHoc from '../component/page/bachoc/headerbachoc'


export default function AppRoutes() {
  return (
    <Routes>
        <Route
        path="/nganh-hoc"
        element={<HeaderListDS />}
      />
            <Route
        path="/bac-hoc/:sectorId"
        element={<HeaderListBacHoc />}
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
