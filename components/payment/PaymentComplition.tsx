"use client";
// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import List, { ListProps } from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CustomChip from "@/@core/components/mui/chip";
import Icon from "@/@core/components/icon";
import { Button, Card, Stack, Table, TableCell, TableRow } from "@mui/material";
import SelectedNumber from "../numbers/purcasenumber/SelectedNumber";
import moment from "moment";
import { useRouter } from "next/navigation";
import { PATH_DASHBOARD } from "@/routes/paths";

const StyledList = styled(List)<ListProps>(({ theme }) => ({
  padding: 0,
  "& .MuiListItem-root": {
    padding: theme.spacing(6),
    border: `1px solid ${theme.palette.divider}`,
    "&:first-of-type": {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
    },
    "&:last-of-type": {
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
    },
    "&:not(:last-of-type)": {
      borderBottom: 0,
    },
    "& .MuiListItemText-root": {
      marginTop: 0,
      marginBottom: theme.spacing(4),
      "& .MuiTypography-root": {
        color: theme.palette.text.secondary,
      },
    },
    "& .remove-item": {
      top: "0.5rem",
      right: "0.625rem",
      position: "absolute",
      color: theme.palette.text.disabled,
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));

const HorizontalList = styled(List)<ListProps>(({ theme }) => ({
  padding: 0,
  display: "flex",
  borderRadius: 6,
  border: `1px solid ${theme.palette.divider}`,
  "& .MuiListItem-root": {
    padding: theme.spacing(6),
    "&:not(:last-of-type)": {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
  [theme.breakpoints.down("md")]: {
    display: "block",
    "& .MuiListItem-root": {
      "&:not(:last-of-type)": {
        borderRight: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  },
}));

const PaymentComplition = ({ data }: { data: any }) => {
  const { address } = data?.shiping;
  const router = useRouter();
  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" sx={{ mb: 4 }}>
                Thank You! 😇
              </Typography>
              <Typography sx={{ mb: 4, color: "text.secondary" }}>
                Your order{" "}
                <Box
                  href="/"
                  component={Link}
                  onClick={(e) => e.preventDefault()}
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  #1536548131
                </Box>{" "}
                has been placed!
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                We sent an email to{" "}
                <Box
                  href="/"
                  component={Link}
                  onClick={(e) => e.preventDefault()}
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  john.doe@example.com
                </Box>{" "}
                with your order confirmation and receipt.
              </Typography>
              <Typography sx={{ mb: 4, color: "text.secondary" }}>
                If the email hasn arrived within two minutes, please check your
                spam folder to see if the email was routed there.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& svg": { color: "text.secondary" },
                }}
              >
                <Icon icon="tabler:clock" fontSize={20} />
                <Typography sx={{ ml: 1.5, color: "text.secondary" }}>
                  <Typography
                    component="span"
                    sx={{ fontWeight: 500, color: "text.secondary" }}
                  >
                    Time placed:
                  </Typography>{" "}
                  {moment(data?.order?.createdAt).format(
                    "YYYY-MM-DD HH:mm:ss A"
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <HorizontalList>
              <ListItem
                sx={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
                  <Box sx={{ mr: 1.5, display: "flex" }}>
                    <Icon icon="tabler:map-pin" fontSize={20} />
                  </Box>
                  <Typography variant="h6">Shipping</Typography>
                </Box>
                <Typography>{data?.shiping?.name}</Typography>
                <Typography>{address?.line1}</Typography>
                <Typography>{address?.city}</Typography>
                <Typography sx={{ mb: 4 }}>{address?.country}</Typography>
                <Typography>{data?.shiping?.phonne}</Typography>
              </ListItem>
              <ListItem
                sx={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
                  <Box sx={{ mr: 1.5, display: "flex" }}>
                    <Icon icon="tabler:credit-card" fontSize={20} />
                  </Box>
                  <Typography variant="h6">Billing Address</Typography>
                </Box>
                <Typography>{data?.shiping?.name}</Typography>
                <Typography>{address?.line1}</Typography>
                <Typography>{address?.city}</Typography>
                <Typography sx={{ mb: 4 }}>{address?.country}</Typography>
                <Typography>{data?.shiping?.phonne}</Typography>
              </ListItem>
            </HorizontalList>
          </Grid>
          <Grid item xs={12} md={8} xl={9}>
            <StyledList>
              <ListItem>
                {data?.number?.numberDetails && (
                  <SelectedNumber number={data?.number?.numberDetails} />
                )}
              </ListItem>
            </StyledList>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              mt={3}
            >
              <Button
                variant="contained"
                onClick={() => {
                  router.replace(PATH_DASHBOARD.numbers.list);
                }}
              >
                Back To Numbers
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} xl={3}>
            <Box
              sx={{
                mb: 4,
                borderRadius: 1,
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <CardContent>
                <Typography sx={{ mb: 4 }} variant="h6">
                  Price Details
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      mb: 4,
                      gap: 2,
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>Order Total</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      ${data?.order?.amount}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      gap: 2,
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  ></Box>
                </Box>
              </CardContent>
              <Divider sx={{ m: "0 !important" }} />
              <CardContent
                sx={{ py: (theme) => `${theme.spacing(3.5)} !important` }}
              >
                <Box
                  sx={{
                    gap: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontWeight: 500 }}>Total</Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    ${data?.order?.amount}
                  </Typography>
                </Box>
              </CardContent>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PaymentComplition;
