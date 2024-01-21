import IconifyIcon from "@/@core/components/icon";
import { IconButton, Stack, Typography, styled, useTheme } from "@mui/material";
import React from "react";
import CallActionButton from "./CallActionButton";

const ProfilePicture = styled("img")(({ theme }) => ({
  width: 70,
  height: 70,
  borderRadius: "20px",
  border: `2px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
}));

const CallDetails = () => {
  const theme = useTheme();
  return (
    <>
      <Stack
        sx={{
          background: "rgb(103,120,240)",
          borderRadius: "10px",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            padding: "5px",
          }}
        >
          <IconButton
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            <IconifyIcon icon={"lucide:fullscreen"} />
          </IconButton>
          <Typography
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            02:00
          </Typography>
        </Stack>

        <Stack justifyContent={"center"} alignItems={"center"}>
          <ProfilePicture src={"/images/avatars/1.png"} alt="profile-picture" />
          <Typography
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            Kishan Ramani
          </Typography>
          <Typography
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            +91 9099458674
          </Typography>
        </Stack>
        <CallActionButton />
      </Stack>
    </>
  );
};

export default CallDetails;
