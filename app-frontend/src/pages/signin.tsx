import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Box,
  CssBaseline,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../api/auth'
import { useAuth } from '../hooks/useAuth'

const theme = createTheme()

type UserData = {
  userName: string
  password: string
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="/" px={1}>
        Modish Standard Limited
      </Link>
      {new Date().getFullYear()}.
    </Typography>
  )
}

export function SignIn() {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState<string>('')
  const { login } = useAuth()

  const { register, handleSubmit } = useForm<UserData>()

  const mutation = useMutation({
    mutationFn: (data: { userName: string; password: string }) => signIn(data),
    onSuccess: (data) => {
      setLoginError('')
      login(data)
      navigate('/dashboard')
    },
    onError: () => {
      setLoginError('Wrong credentials provided')
    },
  })

  const onSubmit: SubmitHandler<UserData> = (data) => {
    mutation.mutate(data)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {loginError ? (
            <Typography variant="body2" color="red" pl={4}>
              {loginError}
            </Typography>
          ) : null}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                autoComplete="userName"
                {...register('userName')}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                {...register('password')}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    Don &#39;t have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
