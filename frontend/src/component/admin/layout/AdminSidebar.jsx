
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'

import {
  Dashboard,
  Settings,
  Image,
  People,
  Article,
  School,
  MenuBook,
  Assignment,
  BarChart,
} from '@mui/icons-material'

import { NavLink } from 'react-router-dom'

const menuItems = [
  { title: 'Dashboard', path: '/admin', icon: <Dashboard /> },
  { title: 'Quản lý chung', path: '/admin/general', icon: <Settings /> },
  { title: 'Quản lý banner', path: '/admin/banners', icon: <Image /> },
  { title: 'Quản lý người dùng', path: '/admin/users', icon: <People /> },
  { title: 'Quản lý bài viết', path: '/admin/posts', icon: <Article /> },
  { title: 'Quản lý ngành học', path: '/admin/sectors', icon: <School /> },
  { title: 'Quản lý bậc học', path: '/admin/levels', icon: <MenuBook /> },
  { title: 'Quản lý đề thi', path: '/admin/exams', icon: <Assignment /> },
  { title: 'Quản lý điểm', path: '/admin/scores', icon: <BarChart /> },
]

export default function AdminSidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 260,
          boxSizing: 'border-box',
          borderRight: '1px solid #e5e7eb',
          background: '#ffffff',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={800} color="#3659C9">
          GĐPT MỸ LỢI
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ADMINISTRATION SYSTEM
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={700}
          sx={{ px: 2 }}
        >
          MENU QUẢN TRỊ
        </Typography>

        <List sx={{ mt: 1 }}>
          {menuItems.map((item, index) => (
            <ListItemButton
              key={index}
              component={NavLink}
              to={item.path}
              end={item.path === '/admin'}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: '#64748b',
                '&.active': {
                  backgroundColor: '#eaf0ff',
                  color: '#3659C9',
                  fontWeight: 700,
                },
                '&.active .MuiListItemIcon-root': {
                  color: '#3659C9',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          DETHIONLINE © 2026
        </Typography>
      </Box>
    </Drawer>
  )
}
