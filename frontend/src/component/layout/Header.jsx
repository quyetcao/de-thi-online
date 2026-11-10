import React from "react";
import Stack from "@mui/material/Stack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "@fontsource/open-sans/latin-ext-400.css";
import "@fontsource/open-sans/latin-ext-500.css";
import "@fontsource/open-sans/latin-ext-600.css";
import "@fontsource/open-sans/latin-ext-700.css";
import MenuIcon from "@mui/icons-material/Menu";
import TemporaryDrawer from "./menubar";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
<style>
@import url('https://fonts.googleapis.com/css2?family=National+Park:wght@200..800&family=Oswald:wght@200..700&display=swap');
</style>

export default function Header() {
    const [open, setOpen] = useState(false);
  return (
    <>
      <Stack
        direction={{ sx: "column", md: "row" }}
        spacing={16}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          fontFamily:"Oswald , sans-serif",
        }}
      >
        <div>
          <Grid
            container
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={4}>
              <LocationOnIcon
                sx={{
                  color: "#E68216",
                  fontSize: "18px",
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                color: "#969696ff",
                transition: "color 0.5s ease-in-out",
                ":hover": {
                  color: "#E68216",
                  cursor: "pointer",
                },
              }}
            >
              <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.5 }}>
                Làng Mỹ Lợi, xóm Mỹ Tích, Thôn 5, Vinh Lộc
              </p>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid
            container
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={4}>
              <PhoneAndroidIcon
                sx={{
                  color: "#E68216",
                  fontSize: "18px",
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                color: "#969696ff",
                transition: "color 0.5s ease-in-out",
                ":hover": {
                  color: "#E68216",
                  cursor: "pointer",
                },
              }}
            >
              <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.5 }}>
                {" "}
                Hotline : 0999999999
              </p>
            </Grid>
          </Grid>
        </div>
      </Stack>
      <div
        className="header-menu"
        style={{
          padding: "10px 0",
          position: "sticky",
          top: 0,
          background: "white",
          zIndex: 1000,
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          opacity: 0.7,
        }}
      >
        <Box
          sx={{
            paddingLeft: { xs: 0, md: "100px" },
            paddingRight: { xs: 0, md: "100px" },
          }}
        >
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: 3 }}>
              {" "}
              <Grid size={{ xs: 6, md: 4 }}>
                <div className="logo">
                  <img
                    srcSet="/images/logo.png 300w, /images/logo.png 3000w"
                    sizes="(max-width: 300px) 300px, 600px"
                    src="/images/logo.png"
                    alt="Logo"
                  />
                </div>
              </Grid>
            </Box>
            <Box sx={{ flex: 7 }}>
              <Grid size={{ xs: 6, md: 12 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    width: "80%",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      minWidth: 110,
                      fontSize: "20px",
                      fontFamily:'"Oswald" , sans-serif',
                      transition: "color 0.5s ease-in-out",
                      ":hover": {
                        color: "#E68216",
                        cursor: "pointer",
                      },
                      fontWeight: "400",
                    }}
                  >
                    <Link href="/" underline="none">
                      Trang chủ
                    </Link>
                  </Typography>
                  <Typography
                    sx={{
                      minWidth: 110,
                      fontSize: "20px",
                       fontFamily:'"Oswald" , sans-serif',
                      transition: "color 0.5s ease-in-out",
                      ":hover": {
                        color: "#E68216",
                        cursor: "pointer",
                      },
                      fontWeight: "400",
                    }}
                  >
                    <Link href="/tai-lieu-tu-hoc" underline="none">
                      Tài Liệu Tu Học
                    </Link>
                  </Typography>
                  <Typography
                    sx={{
                      minWidth: 110,
                       fontFamily:'"Oswald" , sans-serif',
                      fontSize: "20px",
                      transition: "color 0.5s ease-in-out",
                      ":hover": {
                        color: "#E68216",
                        cursor: "pointer",
                      },
                      fontWeight: "400",
                    }}
                  >
                    <Link href="/nganh-hoc" underline="none">
                      Thi Online
                    </Link>
                  </Typography>
                  <Typography
                    sx={{
                      minWidth: 110,
                      fontSize: "20px",
                      fontFamily:'"Oswald" , sans-serif',
                      transition: "color 0.5s ease-in-out",
                      ":hover": {
                        color: "#E68216",
                        cursor: "pointer",
                      },
                      fontWeight: "400",
                    }}
                  >
                    <Link href="/lich-su-gd" underline="none">
                      Lịch Sử
                    </Link>
                  </Typography>
                  <Typography
                    sx={{
                      minWidth: 110,
                      fontFamily:'"Oswald" , sans-serif',
                      fontSize: "20px",
                      transition: "color 0.5s ease-in-out",
                      ":hover": {
                        color: "#E68216",
                        cursor: "pointer",
                      },
                      fontWeight: "400",
                    }}
                  >
                    <Link href="/hinh-anh" underline="none">
                     Hình Ảnh SH
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </Box>

          <Box
            sx={{
              bgcolor: "#FFFFFF",
              display: { xs: "flex", md: "none" },
              justifyItems: "center",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flex: 9, display: "flex", justifyContent: "center" }}>
              {" "}
              <div className="logo">
                <img
                  srcSet="/images/logo.png 200w, /images/logo.png 2000w"
                  sizes="(max-width: 600px) 400px, 600px"
                  src="/images/logo.png"
                  alt="Logo"
                />
              </div>
            </Box>
          </Box>
        </Box>
      </div>
       <TemporaryDrawer
        open={open}
        setOpen={setOpen}
      />
      <Box
        sx={{
          marginTop: {
            xs: "5px", // áp dụng cho màn hình nhỏ
            md: "-50px", // áp dụng cho màn hình >= md
          },
          marginBottom: {
            md: "100px",
          },
        }}
      ></Box>
    </>
  );
}
