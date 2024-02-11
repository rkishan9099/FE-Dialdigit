import { Typography, styled } from "@mui/material";

export const ActionText = styled(Typography)(({ theme }) => ({
 color: theme.palette.mode === "light" ? "black" : "white",
  marginTop: "7px",
  fontSize: "12px",
}));