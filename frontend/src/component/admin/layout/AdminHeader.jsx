
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
} from '@mui/material'

import { useAuth } from '../../../context/AuthContext'

export default function AdminHeader() {
  const { user } = useAuth()

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: '#ffffff',
        color: '#1e293b',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Typography fontWeight={700}>
            Hệ thống quản trị
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Quản lý và vận hành WEB GĐPT MỸ LỢI
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1.5}>
          <Box textAlign="right">
            <Typography fontSize={14} fontWeight={700}>
              {user?.full_name || user?.name || 'Quản trị viên'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Administrator
            </Typography>
          </Box>

          <Avatar sx={{ bgcolor: '#3659C9' }}>
            A
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
