
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchLevels } from '../../../redux/levels/levelThunk'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  flexGrow: 1,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}))

export default function HeaderListBacHoc() {
  // 1. Lấy sectorId từ URL, ví dụ /bac-hoc/1
  const { sectorId } = useParams()

  const dispatch = useDispatch()

  // 2. Lấy danh sách và trạng thái từ Redux
  const { items = [], loading, error } = useSelector(
    (state) => state.levels
  )

  console.log('Redux state:', useSelector((state) => state.levels))
console.log('Sector ID:', sectorId)

  // 3. Khi sectorId thay đổi, lấy lại bậc học của ngành tương ứng
  useEffect(() => {
    const id = Number(sectorId)

    if (Number.isInteger(id) && id > 0) {
      dispatch(fetchLevels(id))
    }
  }, [dispatch, sectorId])

  // 4. Hiển thị trạng thái tải
  if (loading) {
    return (
     <div style={{ textAlign: 'center', marginTop: '20px' }}>
           <span class="loader"></span>
     </div>
    )
    
  }

  // 5. Hiển thị lỗi nếu API thất bại
  if (error) {
    return <p>Lỗi: {error}</p>
  }

  // 6. Hiển thị danh sách bậc học
  return (
    <Box>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        sx={{ flexWrap: 'wrap' }}
      >
        {items.length === 0 ? (
          <p>Chưa có bậc học thuộc ngành này.</p>
        ) : (
          items.map((level) => (
            <Item key={level.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{
                    height: 100,
                    backgroundSize: '20% 70%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                  image="/images/cap_hieu_tach_tung_anh/01_mo_mat.png"
                  title={level.name}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {level.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                  >
                    {level.description}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Item>
          ))
        )}
      </Stack>
    </Box>
  )
}
