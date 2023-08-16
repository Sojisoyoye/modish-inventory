import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SaleTable from '../components/sales-table';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const Dashboard = () => {
  const navigate = useNavigate();


  return (
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
        <Toolbar />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
          <Stack direction='row' ml={3} spacing={2}>
          <Button
          variant="outlined"
          sx={{ 
            borderColor: '#28a745',
            ":hover": {
              borderColor: '#186429',
            }}}
            onClick={() => navigate('/sale')}

          >Create Sale</Button>
            <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#051094', 
              ":hover": {
                backgroundColor: '#000066'
              }}}
              onClick={() => navigate('/product')}
              >
              Create Product
              </Button>
          </Stack>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <SaleTable />
              </Paper>
            </Grid>
          </Grid>
          {/* <Copyright sx={{ pt: 4 }} /> */}
        </Container>
      </Box>
    </Box>
  // </ThemeProvider>
  );
}
