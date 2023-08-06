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
import { useMutation } from '@tanstack/react-query';
import IMAGES from '../images/images';
import Cookie from "universal-cookie";

const cookies = new Cookie();

const theme = createTheme();

function Layout() {

  const handleLogout = () => {
     cookies.remove("TOKEN", { path: "/" });
     window.location.href = "/";
  };

  return (
    // <Box sx={{ display: 'flex' }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <StyledLogo src={IMAGES.modish_logo} alt="modish-logo" />
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
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
      {/* <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            top: 120,
            border: 'none',
            marginLeft: '60px',
          },
        }}
      >
        <Toolbar />
        <Box>
          <List>
            {['Inbox', 'Starred'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer> */}
      <Box component="main">
        <Outlet />
      </Box>
    </ThemeProvider>
    // </Box>

  );
}

const StyledLogo = styled.img`
 width: 200px;
 height: 100px;
`;

export default Layout;

// export function MenuBar() {
//   const navigate = useNavigate();

//   return (
//     <List>
//       <ListItemButton>
//         <ListItemIcon>
//           {/* <DashboardIcon /> */}
//         </ListItemIcon>
//         <ListItemText primary="Dashboard" />
//       </ListItemButton>
//       <ListItemButton>
//         <ListItemIcon>
//           <ShoppingCartIcon />
//         </ListItemIcon>
//         <ListItemText primary="Sales" onClick={() => navigate('/sale')} />
//       </ListItemButton>
//       <ListItemButton>
//         <ListItemIcon>
//           <PeopleIcon />
//         </ListItemIcon>
//         <ListItemText primary="New Sale" />
//       </ListItemButton>
//       <ListItemButton>
//         <ListItemIcon>
//           <BarChartIcon />
//         </ListItemIcon>
//         <ListItemText primary="Products" />
//       </ListItemButton>
//     </List>
//   );
// }
