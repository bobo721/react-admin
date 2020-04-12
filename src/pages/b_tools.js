// in src/pages/b_tool.js
import React from 'react';
import { List, NumberInput, ReferenceInput, Datagrid, Edit, ReferenceField, EditButton, Create, SelectInput, SimpleForm, TextField, DateInput, DateField, Filter, TextInput, BooleanInput, NumberField } from 'react-admin';


const B_toolFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <TextInput label="Title" source="title" defaultValue="Hello, World!" />
    </Filter>
);


export const B_toolList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <NumberField source="active" />
            <NumberField source="time" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <ReferenceField source="UserId" reference="Users">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="ToolId" reference="Tools">
                <TextField source="code" />
            </ReferenceField>            
        </Datagrid>
    </List>
);

export const B_toolCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
        <TextField source="id" />
            <NumberInput source="active" />
            <NumberInput source="time" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <ReferenceInput source="UserId" reference="Users"><TextInput source="id" /></ReferenceInput>
            <ReferenceField source="ToolId" reference="Tools"><TextInput source="id" /></ReferenceField>
        </SimpleForm>
    </Create>
);

export const B_toolEdit = props => (
    <Edit {...props}>
        <SimpleForm>
        <NumberInput source="active" />
            <NumberInput source="time" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <ReferenceField source="UserId" reference="Users"><TextInput source="id" /></ReferenceField>
            <ReferenceField source="ToolId" reference="Tools"><TextInput source="id" /></ReferenceField>
        </SimpleForm>
    </Edit>
);