import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Stack alignItems={'center'} justifyContent={'center'}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        You are welcome
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        MODISH STANDARD
      </Typography>
      <Typography variant="body2">This is the Modish Landing Page</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/login')}
      >
        SIGN IN
      </Button>
    </Stack>
  );
};
