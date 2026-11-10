
import React from "react"
import {
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material"
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        fontFamily:"Oswald , sans-serif",
        background: "linear-gradient(135deg, #e8f5e9, #e3f2fd)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 550,
          backgroundColor: "#fff",
          borderRadius: 5,
          p: {
            xs: 3,
            sm: 5,
          },
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "#e8f5e9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <ConstructionRoundedIcon
            sx={{
              fontSize: 55,
              color: "#16a34a",
            }}
          />
        </Box>

        {/* Tiêu đề */}
        <Typography
          sx={{
            fontSize: 42,
            fontWeight: 900,
            color: "#16a34a",
            mb: 1,
          }}
        >
          404
        </Typography>

        <Typography
          sx={{
             fontFamily:"Oswald , sans-serif",
            fontSize: {
              xs: 20,
              sm: 24,
            },
            fontWeight: 800,
            color: "#001b85",
            mb: 2,
          }}
        >
          Trang đang được cập nhật!
        </Typography>

        <Typography
          sx={{
             fontFamily:"Oswald , sans-serif",
            fontSize: 15,
            lineHeight: 1.9,
            color: "#555",
            mb: 3,
          }}
        >
          Hoan hỉ thông cảm!
          <br />
          Trang mà quý anh chị đang truy cập
          hiện chưa sẵn sàng hoặc đang trong quá
          trình hoàn thiện.
          <br />
          Chúng tôi sẽ sớm cập nhật để phục vụ
          quý anh chị tốt hơn.
        </Typography>

        {/* Nút quay về */}
        <Stack
          direction="row"
          justifyContent="center"
        >
          <Button
            variant="contained"
            startIcon={<HomeRoundedIcon />}
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "#16a34a",
              borderRadius: 3,
              px: 4,
              py: 1.2,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#15803d",
              },
            }}
          >
            Về trang chủ
          </Button>
        </Stack>

        <Typography
          sx={{
            mt: 4,
            fontSize: 12,
            color: "#999",
          }}
        >
          GIA ĐÌNH PHẬT TỬ – KẾT NỐI YÊU THƯƠNG
        </Typography>
      </Box>
    </Box>
  )
}
