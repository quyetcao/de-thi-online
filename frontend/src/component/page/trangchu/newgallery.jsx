
import { Box, Typography } from "@mui/material";

const newsData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title:
      "HỘI NGHỊ ĐẠI BIỂU HUYNH TRƯỞNG GĐPT MỸ LỢI LẦN THỨ 25 (NHIỆM KỲ 2026 – 2031)",
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title:
      "GIA ĐÌNH PHẬT TỬ MỸ LỢI THAM GIA LỄ Vu Lan",
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title:
      "MỸ LỢI: HỘI NGHỊ ĐẠI BIỂU HUYNH TRƯỞNG  GĐPT TỈNH",
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title:
      "BAN HUYNH TRƯỞNG GĐPT MỸ LỢI",
  },
];

export default function NewsGallery() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "1.2fr 1fr",
        },
        height: {
          xs: "auto",
          md: "430px",
        },
        gap: "3px",
        overflow: "hidden",
      }}
    >
      {/* ẢNH LỚN BÊN TRÁI */}
      <Box
        sx={{
          height: {
            xs: "280px",
            md: "100%",
          },
          minHeight: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <NewsItem item={newsData[0]} large />
      </Box>

      {/* CỤM ẢNH BÊN PHẢI */}
      <Box
        sx={{
          height: {
            xs: "auto",
            md: "100%",
          },
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: {
            xs: "200px 150px",
            md: "1.5fr 1fr",
          },
          gap: "3px",
        }}
      >
        {/* ẢNH TRÊN */}
        <Box
          sx={{
            gridColumn: "1 / 3",
            position: "relative",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <NewsItem item={newsData[1]} />
        </Box>

        {/* ẢNH DƯỚI TRÁI */}
        <Box sx={{ position: "relative", minHeight: 0, overflow: "hidden" }}>
          <NewsItem item={newsData[2]} />
        </Box>

        {/* ẢNH DƯỚI PHẢI */}
        <Box sx={{ position: "relative", minHeight: 0, overflow: "hidden" }}>
          <NewsItem item={newsData[3]} />
        </Box>
      </Box>
    </Box>
  );
}

function NewsItem({ item, large = false }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",

        "&:hover img": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box
        component="img"
        src={item.image}
        alt={item.title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "0.4s",
        }}
      />

      {/* LỚP PHỦ TỐI */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85), transparent 70%)",
        }}
      />

      {/* CHÚ GIẢI */}
      <Typography
        sx={{
          position: "absolute",
          bottom: large ? 20 : 12,
          left: large ? 20 : 14,
          right: 12,
          color: "white",
          fontWeight: 700,
          fontSize: {
            xs: large ? "16px" : "13px",
            md: large ? "22px" : "15px",
          },
          lineHeight: 1.4,
          textTransform: "uppercase",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
        }}
      >
        {item.title}
      </Typography>
    </Box>
  );
}
