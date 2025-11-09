// src/books/BookEdit.jsx
import React from 'react';
import { Edit, SimpleForm, TextInput, DateInput, NumberInput } from 'react-admin';

export default function BookEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="author" />
        <NumberInput source="pages" />
        <DateInput source="published_at" />
        <TextInput source="description" multiline />
      </SimpleForm>
    </Edit>
  );
}
