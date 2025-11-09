// src/books/BookShow.jsx
import React from 'react';
import { Show, SimpleShowLayout, TextField, DateField, NumberField } from 'react-admin';

export default function BookShow(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="author" />
        <NumberField source="pages" />
        <DateField source="published_at" label="Published" />
        <TextField source="description" />
      </SimpleShowLayout>
    </Show>
  );
}
