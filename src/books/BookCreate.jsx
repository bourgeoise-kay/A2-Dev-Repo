// src/books/BookCreate.jsx
import React from 'react';
import { Create, SimpleForm, TextInput, DateInput, NumberInput } from 'react-admin';

export default function BookCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="author" />
        <NumberInput source="pages" />
        <DateInput source="published_at" />
        <TextInput source="description" multiline />
      </SimpleForm>
    </Create>
  );
}
