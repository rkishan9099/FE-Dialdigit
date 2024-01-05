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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RHFCustomTextFiled, RHFTextField } from "@/hooks/hook-form";
import { RHFCheckbox } from "@/hooks/hook-form/RHFCheckbox";
import Link from "next/link";
import { PATH_AUTH } from "@/routes/paths";
import { login } from "@/actions/authActions";
import toast from "react-hot-toast";

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: `${theme.palette.primary.main} !important`,
}));

type FormValues ={
  email:string
  password:string
  rememberMe:boolean
}

const LoginForm = () => {
  const theme = useTheme();
  const [showPass,setShowPass]=useState(false)

  const schema = yup.object().shape({
    email: yup.string().required("Email Field Is Required").email(),
    password: yup.string().required("Password is  Required"),
    rememberMe:yup.boolean()
  });
  const defaultValues:FormValues={
    email:'',
    password:'',
    rememberMe:false
  }
  const methods = useForm({
    defaultValues:defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit, watch, reset } = methods;

  const onSubmit = async (data:any) => {
  const res = await login(data)
    };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFCustomTextFiled
          name={"email"}
          size="small"
          label="Email"
          placeholder="john.doe@gmail.com"
          sx={{ display: "flex", mb: 4 }}
          InputLabelProps={{ shrink: true }}
        />
        <RHFCustomTextFiled
          name={"password"}
          size="small"
          label="Password"
          placeholder="******"
          type={showPass?'text' :"password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={()=>setShowPass((prev:boolean)=>!prev)}
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
        <Box
          sx={{
            mb: 1.75,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <RHFCheckbox name="rememberMe" label="Remember Me" />
          <Typography component={LinkStyled} href={PATH_AUTH.forgotPassword}>
            Forgot Password?
          </Typography>
        </Box>
        <Button fullWidth type="submit" variant="contained" sx={{ mb: 4 }}>
          Login
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
            New on our platform?
          </Typography>
          <Typography component={LinkStyled} href={PATH_AUTH.register}>
            Create an account
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

export default LoginForm;
