// src/MyLayout.jsx
import React from 'react';
import { Layout, AppBar } from 'react-admin';
import { Typography } from '@mui/material';

const MyAppBar = (props) => (
  <AppBar {...props}>
    <Typography variant="h6" id="react-admin-title">Trailbase Books Admin</Typography>
  </AppBar>
);

export default (props) => <Layout {...props} appBar={MyAppBar} />;
