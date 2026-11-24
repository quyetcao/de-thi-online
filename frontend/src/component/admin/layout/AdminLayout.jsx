
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

export default function AdminLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fb' }}>
      <AdminSidebar />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <AdminHeader />

        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
