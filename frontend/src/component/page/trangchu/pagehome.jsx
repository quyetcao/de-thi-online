import React from "react";
import AutoPlay from "./slideshow";
import FooterPage from "./footerpage";
import CustomImageList from "./listimagehomepage";
import NewsGallery from "./newgallery";
import { Box, Typography } from "@mui/material";
import NewsList from "./newlist";
export default function HomePage() {
  return (
    <>
    <Box sx={{  width: {xs:"100%",md:"79%"} ,  margin: "0 auto", }}>
    <AutoPlay></AutoPlay>
  <Box
  sx={{
    height: {
      xs: "80px",   // Điện thoại
      sm: "90px",   // Máy tính bảng
      md: "100px",  // Máy tính
    },
    marginTop:"20px",
    borderRadius:"10px",
    backgroundColor: "rgb(51, 194, 120)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: {
      xs: "15px",
      sm: "20px",
      md: "25px",
    },

    fontFamily: "'Lexend', Arial, sans-serif",
    padding: {
      xs: "0 12px",
      sm: "0 20px",
      md: "0 30px",
    },
  }}
>
  Chào mừng quý anh chị ghé thăm trang nhà Gia đình Phật tử Mỹ Lợi!
</Box>

 <Box
  sx={{
    width: "fit-content",

    minHeight: {
      xs: "42px",
      sm: "50px",
      md: "60px",
    },

    margin: {
      xs: "12px 0 12px 0px",
      sm: "16px 0 16px 0px",
      md: "20px 0 20px 0px",
    },

    padding: {
      xs: "6px 12px",
      sm: "8px 15px",
      md: "10px 18px",
    },

    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",

    gap: {
      xs: "5px",
      sm: "8px",
      md: "10px",
    },

    background: "linear-gradient(120deg, #075E38, #159957, #075E38)",
    border: {
      xs: "1px solid #B6E6A0",
      md: "2px solid #B6E6A0",
    },

    borderRadius: {
      xs: "10px 22px 10px 22px",
      sm: "12px 28px 12px 28px",
      md: "15px 35px 15px 35px",
    },

    boxShadow: "0 3px 10px rgba(0, 80, 40, 0.2)",
  }}
>
  <Box
    component="span"
    sx={{
      fontSize: {
        xs: "18px",
        sm: "22px",
        md: "25px",
      },
      lineHeight: 1,
    }}
  >
    🪷
  </Box>

  <Typography
    component="h2"
    sx={{
      color: "white",
      fontSize: {
        xs: "13px",
        sm: "16px",
        md: "18px",
      },
      fontWeight: "bold",
      textAlign: "center",
      margin: 0,
      fontFamily: "'Lexend', sans-serif",
      lineHeight: 1.3,
      whiteSpace: "nowrap",
    }}
  >
    Tin Tức Nổi Bậc!
  </Typography>
</Box>
<NewsGallery></NewsGallery>

 <div>
    <Box
  sx={{
    width: "fit-content",

    minHeight: {
      xs: "42px",
      sm: "50px",
      md: "60px",
    },

    margin: {
      xs: "12px 0 12px 0px",
      sm: "16px 0 16px 0px",
      md: "20px 0 20px 0px",
    },

    padding: {
      xs: "6px 12px",
      sm: "8px 15px",
      md: "10px 18px",
    },

    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",

    gap: {
      xs: "5px",
      sm: "8px",
      md: "10px",
    },

    background: "linear-gradient(120deg, #075E38, #159957, #075E38)",
    border: {
      xs: "1px solid #B6E6A0",
      md: "2px solid #B6E6A0",
    },

    borderRadius: {
      xs: "10px 22px 10px 22px",
      sm: "12px 28px 12px 28px",
      md: "15px 35px 15px 35px",
    },

    boxShadow: "0 3px 10px rgba(0, 80, 40, 0.2)",
  }}
>
  <Box
    component="span"
    sx={{
      fontSize: {
        xs: "18px",
        sm: "22px",
        md: "25px",
      },
      lineHeight: 1,
    }}
  >
    🪷
  </Box>

  <Typography
    component="h2"
    sx={{
      color: "white",
      fontSize: {
        xs: "13px",
        sm: "16px",
        md: "18px",
      },
      fontWeight: "bold",
      textAlign: "center",
      margin: 0,
      fontFamily: "'Lexend', sans-serif",
      lineHeight: 1.3,
      whiteSpace: "nowrap",
    }}
  >
    Hình ảnh sinh hoạt nổi bậc!
  </Typography>
</Box>
<CustomImageList></CustomImageList>
        <Box
  sx={{
    width: "fit-content",

    minHeight: {
      xs: "42px",
      sm: "50px",
      md: "60px",
    },

    margin: {
      xs: "12px 0 12px 0px",
      sm: "16px 0 16px 0px",
      md: "20px 0 20px 0px",
    },

    padding: {
      xs: "6px 12px",
      sm: "8px 15px",
      md: "10px 18px",
    },

    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",

    gap: {
      xs: "5px",
      sm: "8px",
      md: "10px",
    },

    background: "linear-gradient(120deg, #075E38, #159957, #075E38)",
    border: {
      xs: "1px solid #B6E6A0",
      md: "2px solid #B6E6A0",
    },

    borderRadius: {
      xs: "10px 22px 10px 22px",
      sm: "12px 28px 12px 28px",
      md: "15px 35px 15px 35px",
    },

    boxShadow: "0 3px 10px rgba(0, 80, 40, 0.2)",
  }}
>
  <Box
    component="span"
    sx={{
      fontSize: {
        xs: "18px",
        sm: "22px",
        md: "25px",
      },
      lineHeight: 1,
    }}
  >
    🪷
  </Box>

  <Typography
    component="h2"
    sx={{
      color: "white",
      fontSize: {
        xs: "13px",
        sm: "16px",
        md: "18px",
      },
      fontWeight: "bold",
      textAlign: "center",
      margin: 0,
      fontFamily: "'Lexend', sans-serif",
      lineHeight: 1.3,
      whiteSpace: "nowrap",
    }}
  >
    Hoạt động Phật sự trong năm!
  </Typography>
</Box>
<NewsList></NewsList>
 </div>
 <FooterPage></FooterPage>
</Box>
    </>
  )
}