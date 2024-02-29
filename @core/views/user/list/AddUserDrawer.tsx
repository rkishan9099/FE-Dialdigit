"use client";
// ** React Imports
import { useEffect, useState } from "react";
import FormProvider from "@/hooks/hook-form/FormProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Alert,
  Button,
  Divider,
  InputAdornment,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import * as yup from "yup";
import { RHFCustomTextFiled, RHFSelect, RHFTextField } from "@/hooks/hook-form";
import { RHFCheckbox } from "@/hooks/hook-form/RHFCheckbox";
import Link from "next/link";
import { PATH_AUTH } from "@/routes/paths";
import { login } from "@/actions/authActions";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
// ** MUI Imports
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Box, { BoxProps } from "@mui/material/Box";

// ** Custom Component Import
import CustomTextField from "@/@core/components/mui/text-field";

// ** Third Party Imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

// ** Icon Imports

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";

// ** Actions Imports

// ** Types Imports
import { RootState, AppDispatch } from "@/store";
import { UsersType } from "@/types/apps/userTypes";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { createUser, getUserRoles } from "@/store/users/users";

interface SidebarAddUserType {
  open: boolean;
  toggle: () => void;
}

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  roles: string;
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return "";
  }
};

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(6),
  justifyContent: "space-between",
}));

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const { roles } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const schema = yup.object().shape({
    email: yup.string().required("Email Field Is Required").email(),
    firstName: yup.string().required("First Name is  Required"),
    lastName: yup.string().required("Lst Name is  Required"),
    mobile: yup.string().required("Mobile is  Required"),
    roles: yup.string().required("Roles is  Required"),
  });

  useEffect(() => {
    open && dispatch(getUserRoles());
  }, [open]);
  const defaultValues: any = {
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    roles: "",
  };
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, watch, reset } = methods;

  const onSubmit = async (data: UserData) => {
    setErrorMessage("");
    console.debug("data", data);
    try {
      const res: any = await dispatch(createUser(data));
      console.debug("res", res);
      if (res?.statusCode === 201 && res?.status === "success") {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
        setErrorMessage(res?.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something Went Worng");
      setErrorMessage(error.message || "Something went wrong");
    }
  };

  const handleClose = () => {
    toggle();
    reset();
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ "& .MuiDrawer-paper": { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant="h5">Add User</Typography>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            p: "0.438rem",
            borderRadius: 1,
            color: "text.primary",
            backgroundColor: "action.selected",
            "&:hover": {
              backgroundColor: (theme) =>
                `rgba(${theme.palette.customColors.main}, 0.16)`,
            },
          }}
        >
          <Icon icon="tabler:x" fontSize="1.125rem" />
        </IconButton>
      </Header>
      <Box sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
        {errorMessage && (
          <Alert variant="outlined" severity="error" sx={{mb:2}}>
            {errorMessage}
          </Alert>
        )}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFCustomTextFiled
            name="firstName"
            label="First Name"
            sx={{ mb: 4 }}
            size="small"
          />
          <RHFCustomTextFiled
            name="lastName"
            label="Last Name"
            sx={{ mb: 4 }}
            size="small"
          />
          <RHFCustomTextFiled
            name="email"
            label="Eamil"
            sx={{ mb: 4 }}
            size="small"
          />
          <RHFCustomTextFiled
            name="mobile"
            label="Mobile"
            sx={{ mb: 4 }}
            size="small"
          />
          <RHFSelect size="small" name="roles" native sx={{ mb: 4 }}>
            <option value="">Select User Role</option>
            {roles &&
              roles.length > 0 &&
              roles.map((role: any) => (
                <option value={role?._id} key={role?._id}>
                  {role?.name}
                </option>
              ))}
          </RHFSelect>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button type="submit" variant="contained" sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant="tonal" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Drawer>
  );
};

export default SidebarAddUser;
