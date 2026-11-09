import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from '@mui/material/Grid';
<style>
@import url('https://fonts.googleapis.com/css2?family=National+Park:wght@200..800&family=Oswald:wght@200..700&display=swap');
</style>
export default function TemporaryDrawer({ open, setOpen }) {

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