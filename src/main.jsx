// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Admin, Resource, defaultTheme } from 'react-admin';
import { createTheme } from '@mui/material/styles';
import dataProvider, { authProvider } from './ra-trailbase';
import BookList from './books/BookList';
import BookShow from './books/BookShow';
import BookEdit from './books/BookEdit';
import BookCreate from './books/BookCreate';
import Dashboard from './dashboard';
import MyLayout from './MyLayout';

// 🎨 Step 2: Create a custom theme
const myTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: 'light', // or 'dark'
    primary: {
      main: '#6C63FF', // purple accent
    },
    secondary: {
      main: '#FF6584', // pinkish red
    },
    background: {
      default: '#F4F6F8', // light gray background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2E2E2E', 
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    // Optional: rounder buttons, softer cards
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

// 🎨 Step 3: Apply the theme
const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    layout={MyLayout}
    theme={myTheme} // 👈 add this line
  >
    <Resource
      name="books"
      list={BookList}
      show={BookShow}
      edit={BookEdit}
      create={BookCreate}
    />
  </Admin>
);

const root = createRoot(document.getElementById('root'));
root.render(<App />);
