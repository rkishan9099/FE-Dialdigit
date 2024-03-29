import React, { useState } from "react";
import FormProvider from "@/hooks/hook-form/FormProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFCustomTextFiled } from "@/hooks/hook-form";
import Link from "next/link";
import { PATH_AUTH } from "@/routes/paths";
import { signUp } from "@/actions/authActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SignUpParams } from "@/types/authType";

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: `${theme.palette.primary.main} !important`,
}));

const SignUpForm = () => {
  const router = useRouter();
  const theme = useTheme();
  const [showPass, setShowPass] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().required("Email Field Is Required").email(),
    password: yup.string().required("Password is  Required"),
    firstName: yup.string().required("First Name is  Required"),
    lastName: yup.string().required("Last Name is  Required"),
    mobile: yup.string().required("Mobile is  Required"),
  });
  const defaultValues: SignUpParams = {
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
  };
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: SignUpParams) => {
    const response = await signUp(data);
    if (response?.status === "success") {
      toast?.success(response?.message);
      router.replace(PATH_AUTH.login);
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFCustomTextFiled
          name={"firstName"}
          size="small"
          label="First Name"
          placeholder="john"
          sx={{ display: "flex", mb: 4 }}
          InputLabelProps={{ shrink: true }}
        />
        <RHFCustomTextFiled
          name={"lastName"}
          size="small"
          label="Last Name"
          placeholder="Enter Last"
          sx={{ display: "flex", mb: 4 }}
          InputLabelProps={{ shrink: true }}
        />
        <RHFCustomTextFiled
          name={"email"}
          size="small"
          label="Email"
          placeholder="john.doe@gmail.com"
          sx={{ display: "flex", mb: 4 }}
          InputLabelProps={{ shrink: true }}
        />
        <RHFCustomTextFiled
          name={"mobile"}
          size="small"
          label="Mobile"
          placeholder="1234567890"
          sx={{ display: "flex", mb: 4 }}
          InputLabelProps={{ shrink: true }}
        />
        <RHFCustomTextFiled
          name={"password"}
          size="small"
          label="Password"
          placeholder="******"
          type={showPass ? "text" : "password"}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPass((prev: boolean) => !prev)}
                  onMouseDown={(e) => e.preventDefault()}
                  aria-label="toggle password visibility"
                >
                  <Icon
                    fontSize="1.25rem"
                    icon={showPass ? "tabler:eye" : "tabler:eye-off"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mb: 4, mt: 4 }}
        >
          Sign up
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ color: "text.secondary", mr: 2 }}>
            Already have an account?
          </Typography>
          <Typography
            component={LinkStyled}
            href="/login"
            sx={{ fontSize: theme.typography.body1.fontSize }}
          >
            Sign in instead
          </Typography>
        </Box>
        <Divider
          sx={{
            color: "text.disabled",
            "& .MuiDivider-wrapper": { px: 6 },
            fontSize: theme.typography.body2.fontSize,
            my: (theme) => `${theme.spacing(6)} !important`,
          }}
        >
          or
        </Divider>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            href="/"
            component={Link}
            sx={{ color: "#497ce2" }}
            onClick={(e) => e.preventDefault()}
          >
            <Icon icon="mdi:facebook" />
          </IconButton>
          <IconButton
            href="/"
            component={Link}
            sx={{ color: "#1da1f2" }}
            onClick={(e) => e.preventDefault()}
          >
            <Icon icon="mdi:twitter" />
          </IconButton>
          <IconButton
            href="/"
            component={Link}
            onClick={(e) => e.preventDefault()}
            sx={{
              color: (theme) =>
                theme.palette.mode === "light" ? "#272727" : "grey.300",
            }}
          >
            <Icon icon="mdi:github" />
          </IconButton>
          <IconButton
            href="/"
            component={Link}
            sx={{ color: "#db4437" }}
            onClick={(e) => e.preventDefault()}
          >
            <Icon icon="mdi:google" />
          </IconButton>
        </Box>
      </FormProvider>
    </>
  );
};

export default SignUpForm;
