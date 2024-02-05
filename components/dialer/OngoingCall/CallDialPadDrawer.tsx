import {
  Button,
  Card,
  ClickAwayListener,
  Icon,
  IconButton,
  IconButtonProps,
  InputBase,
  Paper,
  Stack,
  Tooltip,
  styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import DialPad from "../Dialpad/DialPad";
import IconifyIcon from "@/@core/components/icon";
import DialPadButtonList from "../Dialpad/DialPadButtonList";
import DialPadInput from "../Dialpad/DialPadInput";
import { Fascinate } from "next/font/google";

const Puller = styled("div")(({ theme }) => ({
  width: 60,
  height: 10,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 5,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: 0,
  right: 0,
  color: "grey.500",
  position: "absolute",
  boxShadow: theme.shadows[2],
  transform: "translate(10px, -10px)",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: "transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out",
  "&:hover": {
    transform: "translate(7px, -5px)",
  },
}));

const CallDialPadDrawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) => {
  const [number, setNumber] = useState<string>("");
  const typeNumber = (num: any) => {
    setNumber(number.concat(num));
  };
  const handleClickAwayEvent = () => {
    if (open) {
      setOpen(false);
    }
  };
  return (
    <Card
      sx={{
        height: open ? "95%" : "6%",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "100%",
        transition: "all 1s",
      }}
    >
      <Puller />

      <Stack sx={{ marginTop: "5px", padding: "12px 0" }}>
        <Stack direction={"row"} justifyContent={"space-around"} spacing={2}>
          <DialPadInput number={number} setNum={setNumber} />
          <IconButton type="button" sx={{ p: "10px" }} onClick={()=>setOpen(false)}>
            <IconifyIcon icon={"tabler:x"} />
          </IconButton>
        </Stack>
        <DialPadButtonList typeNumber={typeNumber} />
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ marginTop: "10px" }}
        >
          <Button
            variant="outlined"
            startIcon={<IconifyIcon icon="ic:baseline-arrow-back" />}
            sx={{ "& .MuiButton-startIcon": { margin: 0 }, maxWidth: 60 }}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default CallDialPadDrawer;
