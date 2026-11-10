import { Routes, Route, Navigate } from 'react-router-dom'
import HeaderListDS from '../component/page/listdsnganh/headerlistds'
import HeaderListBacHoc from '../component/page/bachoc/headerbachoc'
import HomePage from '../component/page/trangchu/pagehome'
import ListDeThiTheoBacHoc from '../component/page/dethi/listdsdethi'
import NotFound from '../component/page/notfound/notfound'


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
    </Routes>
  )
}
