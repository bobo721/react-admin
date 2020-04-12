// in src/pages/tools.js
import React from 'react';
import { List, Datagrid, Edit, EditButton, Create, SelectInput, SimpleForm, TextField, DateInput, DateField, Filter, TextInput, BooleanInput, NumberField } from 'react-admin';

const ToolFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <TextInput label="Title" source="title" defaultValue="Hello, World!" />
    </Filter>
);

export const ToolList = props => (
    <List {...props} filters={<ToolFilter />}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="code" label="Kód" />
            <TextField source="name" />
            <TextField source="state" />
            <NumberField source="free" />
            <DateField source="add_time" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ToolCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="code" label="Kód" />
            <TextInput source="name" />
            <SelectInput source="state" choices={[
                    { id: 'nove', name: 'Nové' },
                    { id: 'pouzite', name: 'Použité' },
                    { id: 'znicene', name: 'Zničené' },
                ]} />
            <BooleanInput source="free" />
        </SimpleForm>
    </Create>
);

export const ToolEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="code" label="Kód" />
            <TextInput source="name" />
            <SelectInput emptyText="state" source="state" choices={[
                    { id: 'nove', name: 'Nové' },
                    { id: 'pouzite', name: 'Použité' },
                    { id: 'znicene', name: 'Zničené' },
                ]} />
            <BooleanInput source="free" />
        </SimpleForm>
    </Edit>
);