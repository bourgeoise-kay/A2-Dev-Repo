import { Admin, Resource, ListGuesser } from "react-admin";
import { BookList } from './books';
import { createTrailbaseProvider } from './ra-trailbase';

const TRAILBASE_URL = 'https://miniature-palm-tree-q79gwj549944f4rv6-4000.app.github.dev/_/admin/table/books'; 
const { dataProvider, authProvider } = await createTrailbaseProvider(TRAILBASE_URL);

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="books" list={BookList}/>
  </Admin>
);

export default App;
