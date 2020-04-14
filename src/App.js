import React from 'react';
import { Admin, Resource, fetchUtils, ListGuesser} from 'react-admin';
//import jsonServerProvider from 'ra-data-json-server';
import { UserList, UserCreate, UserEdit, UserShow } from './pages/users';
import { ToolList, ToolCreate, ToolEdit } from './pages/tools';
import { B_toolList, B_toolEdit, B_toolCreate} from './pages/b_tools';

import dataProvider from './dataProvider';
//import { PostList, PostEdit, PostCreate} from './pages/posts';
//import simpleRestProvider from 'ra-data-simple-rest';
//import simpleRestProvider2 from 'ra-data-json-server';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  // add your own headers here
  options.headers.set('X-Custom-Header', 'foobar');
  return fetchUtils.fetchJson(url, options);
}
const dataProvider2 = dataProvider('http://localhost:8080/api', httpClient);


//const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () => (
      <Admin dataProvider={dataProvider2}>
          <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} show={UserShow} />
          <Resource name="tools" list={ToolList} edit={ToolEdit} create={ToolCreate} />
          <Resource name="b_tools" list={B_toolList}  edit={B_toolEdit} create={B_toolCreate}/>
      </Admin>
  );

export default App;
