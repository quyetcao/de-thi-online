import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from '@mui/material/Grid';
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function TemporaryDrawer({ open, setOpen }) {
    const { user, logout } = useAuth()
  const navigate = useNavigate()
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
        <Box sx={{ flex: 7, margin: "20px"}}>
  <Grid size={{ xs: 12, md: 12 }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
        width: "100%",
        textAlign: "left",
      }}
    >
      {[
        { title: "Trang chủ", link: "/" },
        { title: "Tài Liệu Tu Học", link: "#" },
        { title: "Thi Online", link: "/nganh-hoc" },
        { title: "Lịch sử", link: "#" },
        { title: "Hình Ảnh SH", link: "#" },
      ].map((item, index) => (
        <Typography
          key={index}
          sx={{
            minWidth: 110,
            fontSize: "18px",
            fontWeight: 400,
            fontFamily:'"Oswald" , sans-serif',
            transition: "color 0.3s ease-in-out",
            "&:hover": {
              color: "#E68216",
              cursor: "pointer",
            },
          }}
        >
          <Link
            href={item.link}
            underline="none"
            color="inherit"
          >
            {item.title}
          </Link>
        </Typography>
      ))}
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  {user ? (
    <>
      <Typography sx={{ fontFamily: 'Oswald, sans-serif' }}>
        Xin chào, {user.full_name || user.fullName || user.username}
      </Typography>

      {user.role === 'admin' && (
        <Link href="/admin" underline="none">
          Quản trị
        </Link>
      )}

      <Button
  onClick={() => {
    logout()
    navigate('/')
  }}
  color="error"
  size="small"
>
  Đăng xuất
</Button>
    </>
  ) : (
    <Link href="/login" underline="none">
      <AccountCircleIcon />
    </Link>
  )}
</Box>
  </Grid>
</Box>
     
    </Box>
  );

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer(false)}
    >
      {DrawerList}
    </Drawer>
  );
}