import React from 'react';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import IMAGES from '../images/images';
import Cookie from "universal-cookie";
import { AlertProvider } from '../hooks/useAlert';

const cookies = new Cookie();

const theme = createTheme();

function Layout() {

  const handleLogout = () => {
     cookies.remove("TOKEN", { path: "/" });
     window.location.href = "/";
  };

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <AlertProvider>
      <CssBaseline />
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography 
          component="div" 
          sx={{ flexGrow: 1 }} 
          onClick={() => navigate('/dashboard')}
          > 
            <StyledLogo src={IMAGES.modish_logo} alt="modish-logo" />
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
          <Button variant='text' onClick={() => navigate('/products')}>
            Products
          </Button>
          <Typography color="#7f7f7f">Username</Typography>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              color="#0d152d"
            />
            <Button 
            variant="text" 
            sx={{ color: '#142044' }} 
            onClick={handleLogout}>Log out</Button>
          </Stack>
        </Toolbar>
      </AppBar>

    <Box sx={{ display: 'flex' }}>
      <Box
      component="main"
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900]),
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
      >
        <Outlet />
        </Box>
    </Box>
    </AlertProvider>
    </ThemeProvider>
  );
}

const StyledLogo = styled.img`
 width: 200px;
 height: 100px;
`;

export default Layout;
