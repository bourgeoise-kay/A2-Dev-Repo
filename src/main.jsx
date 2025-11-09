// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Admin, Resource } from 'react-admin';
import dataProvider, { authProvider } from './ra-trailbase';
import BookList from './books/BookList';
import BookShow from './books/BookShow';
import BookEdit from './books/BookEdit';
import BookCreate from './books/BookCreate';
import Dashboard from './dashboard';
import MyLayout from './MyLayout';

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    layout={MyLayout}
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
