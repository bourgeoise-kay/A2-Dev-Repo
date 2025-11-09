import { List, DataTable, DateField, NumberField } from 'react-admin';
import { SearchInput} from 'react-admin';
import { Fragment } from 'react';
import { BulkDeleteButton, BulkExportButton } from 'react-admin';

const PostBulkActionButtons = () => (
    <Fragment>
        <BulkExportButton />
        <BulkDeleteButton />
    </Fragment>
);


const bookFilters = [
  <SearchInput source="q" placeholder="Search books..." alwaysOn />
];

export const BookList = () => (
    <List filters={bookFilters}>
        <DataTable bulkActionButtons={<PostBulkActionButtons />}>
            <DataTable.Col source="book_id" />
            <DataTable.Col source="title" />
            <DataTable.Col source="subtitle" />
            <DataTable.Col source="genre" />
            <DataTable.Col source="publisher" />
            <DataTable.Col source="publication_date"/>
            <DataTable.Col source="isbn" />
            <DataTable.Col source="pages" field={NumberField} />
            <DataTable.Col source="language" />
        </DataTable>
    </List>
);