import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import CallActionButton from "./CallActionButton";
import { CustomCallButton } from "@/@core/styles/mui/button";
import IconifyIcon from "@/@core/components/icon";
import { ProfilePicture } from "@/@core/styles/mui/customImage";

const ConferenceCallList = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={2}
        sx={{
          background: "transparent",
        }}
      >
        <Tooltip title="90999">
          <Box sx={{ position: "relative" }}>
            <ProfilePicture
              onClick={handleClick}
              sx={{ width: "60px", height: "60px", cursor: "pointer" }}
              src={"/images/avatars/1.png"}
              alt="profile-picture"
            />
            <Stack
              sx={{
                position: "absolute",
                width: "25px",
                height: "25px",
                background: theme.palette.background.paper,
                borderRadius: "50%",
                top: "-5px",
                right: "-5px",
                border: "3px solid #00000091",
                alignItems:'center',
                justifyContent:'center'
              }}
            >
              <IconifyIcon icon={"material-symbols:call-end"} />
            </Stack>
          </Box>
        </Tooltip>
       
      </Stack>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 40,
              height: 40,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} sx={{ padding: "0px" }}>
          <Button
            sx={{
              background: "red",
              color: "white",
              "&:hover": {
                background: "white",
                color: "red",
              },
            }}
          >
            <IconifyIcon icon={"material-symbols:call-end"} />
          </Button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default ConferenceCallList;
