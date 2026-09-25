import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

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
}));

export default function HeaderListDS() {
  return (
    <>
      <div>
          <Box>
     <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        sx={{ flexWrap: 'wrap' }}
      >
        <Item>  <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 100,
            backgroundSize: "20% 70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
         }}
        image="../../images/cap_hieu_tach_tung_anh/01_mo_mat.png"
        title=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          BẬC MỞ MẮT
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card></Item>
       <Item>  <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 100,
            backgroundSize: "20% 70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
         }}
        image="../../images/cap_hieu_tach_tung_anh/01_mo_mat.png"
        title=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          BẬC MỞ MẮT
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card></Item>
    <Item>  <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 100,
            backgroundSize: "20% 70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
         }}
        image="../../images/cap_hieu_tach_tung_anh/01_mo_mat.png"
        title=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          BẬC MỞ MẮT
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card></Item>
    <Item>  <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 100,
            backgroundSize: "20% 70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
         }}
        image="../../images/cap_hieu_tach_tung_anh/01_mo_mat.png"
        title=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          BẬC MỞ MẮT
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card></Item>
    <Item>  <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 100,
            backgroundSize: "20% 70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
         }}
        image="../../images/cap_hieu_tach_tung_anh/01_mo_mat.png"
        title=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          BẬC MỞ MẮT
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card></Item>
    <Item>  <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 100,
            backgroundSize: "20% 70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
         }}
        image="../../images/cap_hieu_tach_tung_anh/01_mo_mat.png"
        title=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          BẬC MỞ MẮT
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Item>
      </Stack>
      </Box>
    </div>
    </>
  );
}
