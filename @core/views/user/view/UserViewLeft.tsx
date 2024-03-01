"use client";
// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputAdornment from "@mui/material/InputAdornment";
import LinearProgress from "@mui/material/LinearProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import DialogContentText from "@mui/material/DialogContentText";

// ** Icon Imports
import Icon from "@/@core/components/icon";

// ** Custom Components
import CustomChip from "@/@core/components/mui/chip";
import CustomAvatar from "@/@core/components/mui/avatar";
import CustomTextField from "@/@core/components/mui/text-field";

// ** Types
import { ThemeColor } from "@/@core/layouts/types";
import { UsersType } from "@/types/apps/userTypes";

// ** Utils Import
import { getInitials } from "@/@core/utils/get-initials";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { useParams } from "next/navigation";
import { getUserById } from "@/store/users/users";
import { CircularProgress } from "@mui/material";

interface ColorsType {
  [key: string]: ThemeColor;
}

const data: UsersType = {
  id: 1,
  role: "admin",
  status: "active",
  username: "gslixby0",
  avatarColor: "primary",
  country: "El Salvador",
  company: "Yotz PVT LTD",
  billing: "Manual - Cash",
  contact: "(479) 232-9151",
  currentPlan: "enterprise",
  fullName: "Daisy Patterson",
  email: "gslixby0@abc.net.au",
  avatar: "/images/avatars/14.png",
};

const roleColors: ColorsType = {
  admin: "error",
  editor: "info",
  author: "warning",
  maintainer: "success",
  subscriber: "primary",
};

const statusColors: ColorsType = {
  "1": "success",
  "0": "warning",
  inactive: "secondary",
};

// ** Styled <sup> component
const Sup = styled("sup")(({ theme }) => ({
  top: 0,
  left: -10,
  position: "absolute",
  color: theme.palette.primary.main,
}));

// ** Styled <sub> component
const Sub = styled("sub")(({ theme }) => ({
  alignSelf: "flex-end",
  color: theme.palette.text.disabled,
  fontSize: theme.typography.body1.fontSize,
}));

const UserViewLeft = () => {
  // ** States
  const { selectedUser } = useAppSelector((state) => state.users);
  const { id } = useParams();
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserById(id.toString()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  if (selectedUser) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent
              sx={{
                pt: 13.5,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {selectedUser.profilePicture ? (
                <CustomAvatar
                  src="/images/avatars/1.png"
                  variant="rounded"
                  alt={selectedUser.name}
                  sx={{ width: 100, height: 100, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin="light"
                  variant="rounded"
                  color={"primary"}
                  sx={{ width: 100, height: 100, mb: 4, fontSize: "3rem" }}
                >
                  {getInitials(selectedUser?.name)}
                </CustomAvatar>
              )}
              <Typography variant="h4" sx={{ mb: 3 }}>
                {selectedUser.name}
              </Typography>
              <CustomChip
                rounded
                skin="light"
                size="small"
                label={data.role}
                color={roleColors[data.role]}
                sx={{ textTransform: "capitalize" }}
              />
            </CardContent>

            <CardContent
              sx={{ pt: (theme) => `${theme.spacing(2)} !important` }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ mr: 8, display: "flex", alignItems: "center" }}>
                  <CustomAvatar
                    skin="light"
                    variant="rounded"
                    sx={{ mr: 2.5, width: 38, height: 38 }}
                  >
                    <Icon fontSize="1.75rem" icon="tabler:checkbox" />
                  </CustomAvatar>
                  <div>
                    <Typography
                      sx={{ fontWeight: 500, color: "text.secondary" }}
                    >
                      1.23k
                    </Typography>
                    <Typography variant="body2">Task Done</Typography>
                  </div>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CustomAvatar
                    skin="light"
                    variant="rounded"
                    sx={{ mr: 2.5, width: 38, height: 38 }}
                  >
                    <Icon fontSize="1.75rem" icon="tabler:briefcase" />
                  </CustomAvatar>
                  <div>
                    <Typography
                      sx={{ fontWeight: 500, color: "text.secondary" }}
                    >
                      568
                    </Typography>
                    <Typography variant="body2">Project Done</Typography>
                  </div>
                </Box>
              </Box>
            </CardContent>

            <Divider sx={{ my: "0 !important", mx: 6 }} />

            <CardContent sx={{ pb: 4 }}>
              <Typography
                variant="body2"
                sx={{ color: "text.disabled", textTransform: "uppercase" }}
              >
                Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Mobile:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {selectedUser?.mobile}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Email:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {selectedUser.email}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 3, alignItems: "center" }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Status:
                  </Typography>
                  <CustomChip
                    rounded
                    skin="light"
                    size="small"
                    label={selectedUser.status == 1 ? "Active" : "In-Active"}
                    color={statusColors[selectedUser.status]}
                    sx={{
                      textTransform: "capitalize",
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Role:
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      textTransform: "capitalize",
                    }}
                  >
                    {selectedUser?.roles?.role}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Tax ID:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    Tax-8894
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Contact:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    +1 {selectedUser?.mobile}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Language:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    English
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Country:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {data.country}
                  </Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{ mr: 2 }}
                onClick={handleEditClickOpen}
              >
                Edit
              </Button>
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby="user-view-edit"
              aria-describedby="user-view-edit-description"
              sx={{ "& .MuiPaper-root": { width: "100%", maxWidth: 650 } }}
            >
              <DialogTitle
                id="user-view-edit"
                sx={{
                  textAlign: "center",
                  fontSize: "1.5rem !important",
                  px: (theme) => [
                    `${theme.spacing(5)} !important`,
                    `${theme.spacing(15)} !important`,
                  ],
                  pt: (theme) => [
                    `${theme.spacing(8)} !important`,
                    `${theme.spacing(12.5)} !important`,
                  ],
                }}
              >
                Edit User Information
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: (theme) => `${theme.spacing(8)} !important`,
                  px: (theme) => [
                    `${theme.spacing(5)} !important`,
                    `${theme.spacing(15)} !important`,
                  ],
                }}
              >
                <DialogContentText
                  variant="body2"
                  id="user-view-edit-description"
                  sx={{ textAlign: "center", mb: 7 }}
                >
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        fullWidth
                        label="Full Name"
                        placeholder="John Doe"
                        defaultValue={data.fullName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        fullWidth
                        label="Username"
                        placeholder="John.Doe"
                        defaultValue={data.username}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">@</InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        fullWidth
                        type="email"
                        label="Billing Email"
                        defaultValue={data.email}
                        placeholder="john.doe@gmail.com"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        select
                        fullWidth
                        label="Status"
                        defaultValue={data.status}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                      </CustomTextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        fullWidth
                        label="TAX ID"
                        defaultValue="Tax-8894"
                        placeholder="Tax-8894"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        fullWidth
                        label="Contact"
                        placeholder="723-348-2344"
                        defaultValue={`+1 ${data.contact}`}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        select
                        fullWidth
                        label="Language"
                        defaultValue="English"
                      >
                        <MenuItem value="English">English</MenuItem>
                        <MenuItem value="Spanish">Spanish</MenuItem>
                        <MenuItem value="Portuguese">Portuguese</MenuItem>
                        <MenuItem value="Russian">Russian</MenuItem>
                        <MenuItem value="French">French</MenuItem>
                        <MenuItem value="German">German</MenuItem>
                      </CustomTextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        select
                        fullWidth
                        label="Country"
                        defaultValue="USA"
                      >
                        <MenuItem value="USA">USA</MenuItem>
                        <MenuItem value="UK">UK</MenuItem>
                        <MenuItem value="Spain">Spain</MenuItem>
                        <MenuItem value="Russia">Russia</MenuItem>
                        <MenuItem value="France">France</MenuItem>
                        <MenuItem value="Germany">Germany</MenuItem>
                      </CustomTextField>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        label="Use as a billing address?"
                        control={<Switch defaultChecked />}
                        sx={{ "& .MuiTypography-root": { fontWeight: 500 } }}
                      />
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: "center",
                  px: (theme) => [
                    `${theme.spacing(5)} !important`,
                    `${theme.spacing(15)} !important`,
                  ],
                  pb: (theme) => [
                    `${theme.spacing(8)} !important`,
                    `${theme.spacing(12.5)} !important`,
                  ],
                }}
              >
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  onClick={handleEditClose}
                >
                  Submit
                </Button>
                <Button
                  variant="tonal"
                  color="secondary"
                  onClick={handleEditClose}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent
              sx={{
                pb: 1,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <CustomChip
                rounded
                skin="light"
                size="small"
                color="primary"
                label="Popular"
              />
              <Box sx={{ display: "flex", position: "relative" }}>
                <Sup>$</Sup>
                <Typography
                  variant="h4"
                  sx={{
                    mt: -1,
                    mb: -1.2,
                    color: "primary.main",
                    fontSize: "2.375rem !important",
                  }}
                >
                  99
                </Typography>
                <Sub>/ month</Sub>
              </Box>
            </CardContent>

            <CardContent>
              <Box sx={{ mt: 2.5, mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    mb: 2,
                    alignItems: "center",
                    "& svg": { mr: 2, color: "text.secondary" },
                  }}
                >
                  <Icon icon="tabler:point" fontSize="1.125rem" />
                  <Typography sx={{ color: "text.secondary" }}>
                    10 Users
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    "& svg": { mr: 2, color: "text.secondary" },
                  }}
                >
                  <Icon icon="tabler:point" fontSize="1.125rem" />
                  <Typography sx={{ color: "text.secondary" }}>
                    Up to 10GB storage
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "& svg": { mr: 2, color: "text.secondary" },
                  }}
                >
                  <Icon icon="tabler:point" fontSize="1.125rem" />
                  <Typography sx={{ color: "text.secondary" }}>
                    Basic Support
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mb: 1.5,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>Days</Typography>
                <Typography sx={{ fontWeight: 500 }}>75% Completed</Typography>
              </Box>
              <LinearProgress
                value={75}
                variant="determinate"
                sx={{ height: 10 }}
              />
              <Typography sx={{ mt: 1.5, mb: 6, color: "text.secondary" }}>
                4 days remaining
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mt: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CircularProgress sx={{ mb: 4 }} />
          <Typography>Loading...</Typography>
        </Box>
      </Card>
    );
  }
};

export default UserViewLeft;
