
import { Box, Container, Paper, Typography } from '@mui/material'

export default function AuthLayout({ title, subtitle, children,  sx, }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 5,
        fontFamily:"Oswald , sans-serif",
        background: `
          radial-gradient(circle at 10% 10%, #dcebe0 0, transparent 30%),
          radial-gradient(circle at 90% 90%, #dce5f0 0, transparent 30%),
          #F7F5ED
        `,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '0.9fr 1.1fr',
            },
            overflow: 'hidden',
            fontFamily:"Oswald , sans-serif",
            borderRadius: 5,
            border: '1px solid #e5e5dc',
            boxShadow: '0 20px 60px rgba(36,76,112,0.10)',
          }}
        >
          {/* Khu vực giới thiệu */}
          <Box
            sx={{
              p: { xs: 4, md: 5 },
              color: 'white',
              background: 'linear-gradient(145deg, #244C70, #416F7B)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontFamily:"Oswald , sans-serif",
              minHeight: { xs: 230, md: 540 },
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography sx={{ fontSize: 65, mb: 1 }}>
              ❀
            </Typography>

            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ letterSpacing: 1,fontFamily:"Oswald , sans-serif", }}
            >
              GIA ĐÌNH PHẬT TỬ
            </Typography>

            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: '#E8D9A9', mt: 1,fontFamily:"Oswald , sans-serif", }}
            >
              MỸ LỢI
            </Typography>

            <Box
              sx={{
                width: 65,
                height: 3,
                bgcolor: '#DCCB91',
                my: 3,
                fontFamily:"Oswald , sans-serif",
                borderRadius: 5,
              }}
            />

            <Typography
              sx={{
                lineHeight: 1.9,
                maxWidth: 280,
                fontFamily:"Oswald , sans-serif",
                color: '#E8F0F0',
              }}
            >
              Áo lam chung bước đường tu học,
              Sen nở trong tim sáng tình lam.
            </Typography>

            <Typography
              variant="caption"
              sx={{
                mt: 4,
                color: '#D5E2E5',
                letterSpacing: 1,
              }}
            >
              BI TRÍ DŨNG
            </Typography>

            {/* Họa tiết trang trí */}
            <Typography
              sx={{
                position: 'absolute',
                bottom: -55,
                right: -20,
                fontSize: 170,
                color: 'rgba(255,255,255,0.07)',
              }}
            >
              ❀
            </Typography>
          </Box>

          {/* Khu vực biểu mẫu */}
          <Box
            sx={{
              p: { xs: 3, sm: 5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h5"
              fontWeight={800}
              color="#244C70"
              textAlign="center"
            >
              {title}
            </Typography>

            <Typography
              color="text.secondary"
              textAlign="center"
              sx={{ mt: 1, mb: 4 }}
            >
              {subtitle}
            </Typography>

            {children}
          </Box>
        </Paper>

        <Typography
          textAlign="center"
          color="text.secondary"
          variant="caption"
          sx={{ display: 'block', mt: 3 }}
        >
          © Gia đình Phật tử Mỹ Lợi
        </Typography>
      </Container>
    </Box>
  )
}
