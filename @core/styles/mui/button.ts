import { hexToRGBA } from "@/@core/utils/hex-to-rgba";
import { Button, IconButton, styled } from "@mui/material";

export const CustomActionButton = styled(IconButton)(({ theme }) => ({
    fontSize: "37px",
    width: "68px",
    height: "68px",
    borderRadius: "19px",
 flexDirection:'column',
  boxShadow: `none`,
  background: `transparent`,
  color: theme.palette.info.contrastText,
  '&:hover': {
    background: hexToRGBA(theme.palette.primary.main, 0.3)
  },
  '&:disabled': {
    color: 'lightgray',
      background: hexToRGBA(theme.palette.primary.main, 0.3)
  }
}))
