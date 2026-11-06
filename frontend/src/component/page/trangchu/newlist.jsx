
import React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const newsData = [
  {
    id: 1,
    title: "Gia đình Phật tử Mỹ Lợi tổ chức sinh hoạt định kỳ",
    image: "../../public/images/banner/banner1.jpg",
  },
  {
    id: 2,
    title: "Lễ Phật và sinh hoạt tu học tại chùa Mỹ Lợi",
    image: "../../public/images/banner/banner1.jpg",
  },
  {
    id: 3,
    title: "Hoạt động trại và tinh thần đoàn kết áo Lam",
    image: "../../public/images/banner/banner1.jpg",
  },
  {
    id: 4,
    title: "Tuổi trẻ áo Lam với những hoạt động thiện nguyện",
    image: "../../public/images/banner/banner1.jpg",
  },
];

function NewsList() {
  return (
    <Box
      sx={{
        width: "100%",
        margin: "0 auto",
        padding: {
          xs: "12px",
          sm: "20px",
          md: "25px",
        },
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {newsData.map((news) => (
          <Grid
            key={news.id}
            size={{ xs: 12, sm: 6 }}
          >
            <Card
              sx={{
                height: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 5px 18px rgba(0,0,0,0.18)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={news.image}
                alt={news.title}
                sx={{
                  width: "100%",
                  height: {
                    xs: "180px",
                    sm: "200px",
                    md: "250px",
                  },
                  objectFit: "cover",
                }}
              />

              <CardContent
                sx={{
                  padding: {
                    xs: "12px",
                    sm: "16px",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: {
                      xs: "14px",
                      sm: "16px",
                      md: "18px",
                    },
                    fontWeight: 600,
                    color: "#075E38",
                    lineHeight: 1.5,
                  }}
                >
                  {news.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default NewsList;
