'use client'
import themeConfig from '@/configs/themeConfig'
import { Box, BoxProps, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, styled, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import IconifyIcon from '@/@core/components/icon'
import Image from 'next/image'


const RightWrapper = styled(Box)<BoxProps>(() => ({
    width: '100%',
    maxWidth: 500
  }))

  
const schema = yup.object().shape({
    email: yup.string().email('Enter a valid Email').required('Email is required'),
    password: yup.string().min(6, 'Password must be atleast 6 chracters').required('Password is required')
  })
  
  const defaultValues = {
    password: '',
    email: ''
  }
  
  interface FormData {
    email: string
    password: string
  }
  
const AuthLayout = ({children}:{children: React.ReactNode}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
  
    // ** Hooks
    const theme = useTheme()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))

    const auth:any = {}
  
    const {
      control,
      setError,
      handleSubmit,
      formState: { errors }
    } = useForm({
      defaultValues,
      mode: 'onBlur',
      resolver: yupResolver(schema)
    })
  
    const onSubmit = async (data: FormData) => {
      const { email, password } = data
      setIsLoading(true);
      auth.login({ email, password }, () => {
        setIsLoading(false);
        setError('email', {
          type: 'manual',
          message: 'Email or Password is invalid'
        })
      })
    }
  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden && (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8),
            width: '100%',
            height: `calc(100vh - ${theme.spacing(16)})`,
            // backgroundImage: `url('/images/pages/auth-v2-login-illustration-bordered-light.png')`,
            // backgroundRepeat: 'no-repeat',
            // backgroundSize: '100% 100%'
          }}
        >
            <Image src={'/images/pages/auth-v2-login-illustration-bordered-light.png'} alt='login-illustration' width={500} height={500} />
        </Box>
      )}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Box sx={{ my: 6 }}>
              <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                {`Sign in to ${themeConfig.templateName}!`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Please sign-in to your account and start the adventure
              </Typography>
            </Box>

            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='Email Address'
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 1.5 }}>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <IconifyIcon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  float: 'right'
                }}
              >
              </Box>
              <LoadingButton fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4, mt: 2 }} loading={isLoading}>
                Login
              </LoadingButton>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

export default AuthLayout
