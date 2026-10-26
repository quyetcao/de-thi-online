import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSectors } from "../../../redux/sectors/sectorThunk";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  flexGrow: 1,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function HeaderListDS() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.sectors);

  useEffect(() => {
    dispatch(fetchSectors());
  }, [dispatch]);

  if (loading) {
    return <p>Đang tải danh sách ngành học...</p>;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
  }
  return (
    <>
      <div>
        <Box>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            {items.length === 0 ? (
              <p>Chưa có ngành học.</p>
            ) : (
              items.map((sector) => (
                <Item key={sector.id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      sx={{
                        height: 100,
                        backgroundSize: "20% 70%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                      image="../../images/cap_hieu_tach_tung_anh/01_mo_mat.png"
                      title=""
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {sector.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {sector.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button
                        size="small"
                        component={Link}
                        to={`/bac-hoc/${sector.id}`}
                      >
                        Xem bậc Học
                      </Button>
                    </CardActions>
                  </Card>
                </Item>
              ))
            )}
          </Stack>
        </Box>
      </div>
    </>
  );
}
