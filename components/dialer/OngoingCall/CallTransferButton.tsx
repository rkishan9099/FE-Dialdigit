import IconifyIcon from "@/@core/components/icon";
import { CustomActionButton } from "@/@core/styles/mui/button";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  Tooltip,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import MuiMenu, { MenuProps } from "@mui/material/Menu";
import MuiMenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import { hexToRGBA } from "@/@core/utils/hex-to-rgba";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateSipState } from "@/store/dialer/sip";
import { usePathname } from "next/navigation";
import { PATH_DASHBOARD } from "@/routes/paths";
import { update } from "@/auth";

const ActionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "light" ? "black" : "white",
  marginTop: "7px",
  fontSize: "12px",
}));

const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  margin: 0,
  borderRadius: 0,
  "&:not(.Mui-focusVisible):hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.Mui-selected": {
    backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08),
  },
  "&.Mui-focusVisible": {
    backgroundColor: theme.palette.primary.main,
    "& .MuiListItemIcon-root, & .MuiTypography-root": {
      color: theme.palette.common.white,
    },
  },
}));

const CallTransferButton = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<AppDispatch>();
  const pathName = usePathname();

  const ButtonStyle = {
    color: theme.palette.mode === "light" ? "black" : "white",
    "&:hover": {
      background: theme.palette.customColors.bodyBg,
    },
    "&:disabled": {
      color: "white",
      background: "rgba(0,0,0,0.3)",
    },
  };

  const handleCallTransfer = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const blindTransferHandler = () => {
    dispatch(updateSipState({ key: "callTransfer", value: true }));
    dispatch(updateSipState({ key: "isBlindTransfer", value: true }));
    dispatch(updateSipState({ key: "toggleDrawerSheet", value: true }));
    dispatch(updateSipState({ key: "isAddCall", value: false }));
    dispatch(updateSipState({ key: "isAttendedTransfer", value: false }));
  };

  const attendedTransferHandler = () => {
    dispatch(updateSipState({ key: "callTransfer", value: true }));
    dispatch(updateSipState({ key: "isAttendedTransfer", value: true }));
    dispatch(updateSipState({ key: "toggleDrawerSheet", value: true }));
    dispatch(updateSipState({ key: "isAddCall", value: false }));
    dispatch(updateSipState({ key: "isBlindTransfer", value: false }));
  };

  return (
    <>
      <Tooltip title={"Transfer Call"}>
        <CustomActionButton sx={ButtonStyle} onClick={handleCallTransfer}>
          <IconifyIcon icon={"fluent:call-transfer-16-filled"} width={"25px"} />
        </CustomActionButton>
      </Tooltip>
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
        <MenuItem onClick={attendedTransferHandler}>
          <ListItemIcon>
            <Icon icon="fluent-mdl2:transfer-call" fontSize={20} />
          </ListItemIcon>
          <ListItemText primary="Attended Transfer" />
        </MenuItem>
        <MenuItem onClick={blindTransferHandler}>
          <ListItemIcon>
            <Icon icon="wpf:call-transfer" fontSize={20} />
          </ListItemIcon>
          <ListItemText primary="Blind Transfer" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default CallTransferButton;
