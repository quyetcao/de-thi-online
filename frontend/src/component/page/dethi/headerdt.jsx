import Paper from "@mui/material/Paper";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

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

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function Headerdt() {
     const id = React.useId();
  return (
    <div>
      <Box sx={{ width: "80%", margin: "0 auto", mt: 2 }}>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          <Item>
            <p>GIA ĐÌNH PHẬT TỬ MỸ LỢI</p>
            <p>BI - TRÍ - DŨNG</p>
          </Item>
          <Item>
            <p>HỆ THỐNG ĐỀ THI ONLINE</p>
            <p>THỜI GIAN: 90 PHÚT</p>
            <p>BẬC HỌC: CHÂN CỨNG</p>
          </Item>
        </Stack>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          <Item>
            <Stack direction="column">
              <Item sx={{ textAlign: "left" }}>
                <p>
                  Họ Và Tên: <input type="text" placeholder="Nhập tên bạn..." />
                </p>
                <p>
                  Pháp Danh:{" "}
                  <input type="text" placeholder="Nhập pháp danh..." />
                </p>
                <p>
                  Bậc Học: <input type="text" placeholder="Nhập bậc học..." />
                </p>
              </Item>
            </Stack>
          </Item>
        </Stack>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          <Item>
            <Stack direction="column">
              <Item sx={{ textAlign: "center" }}>
                <p>ĐỀ THI BẬC CHÂN CỨNG</p>
              </Item>
            </Stack>
          </Item>
        </Stack>

        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          <Item>
            <Stack direction="column">
              <Item sx={{ textAlign: "left" }}>
                <div>
                  <strong>Câu 1:</strong>
                  <a>
                    Thái tử Tất-đạt-đa (Siddhartha), vị thế tôn sau này đắc đạo
                    thành Phật, sinh ra tại vương quốc nào?
                  </a>
                </div>
                <div>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby={`${id}-label`}
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Ca-tỳ-la-vệ"
                        control={<Radio />}
                        label="Ca-tỳ-la-vệ"
                      />
                      <FormControlLabel
                        value="Ma-kiệt-đà"
                        control={<Radio />}
                        label="Ma-kiệt-đà"
                      />
                      <FormControlLabel
                        value="Kiều-tát-la"
                        control={<Radio />}
                        label="Kiều-tát-la"
                      />
                      <FormControlLabel
                        value="Bạt-vệ"
                        control={<Radio />}
                        label="Bạt-vệ"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Item>
            </Stack>
          </Item>
        </Stack>
      </Box>
    </div>
  );
}
