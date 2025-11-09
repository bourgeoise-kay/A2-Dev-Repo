// src/books/BookList.jsx
import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  EditButton,
  ShowButton,
  Filter,
  TextInput
} from 'react-admin';

const BookFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search (title/author)" source="q" alwaysOn />
    <TextInput label="Author" source="author" />
  </Filter>
);

export default function BookList(props) {
  return (
    <List {...props} filters={<BookFilter />}>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="author" />
        <NumberField source="pages" />
        <DateField source="published_at" label="Published" />
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  );
}
