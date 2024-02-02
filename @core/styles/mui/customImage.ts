import { styled } from "@mui/material";

export const ProfilePicture = styled("img")(({ theme }) => ({
  width: 70,
  height: 70,
  borderRadius: "20px",
  border: `2px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
}));