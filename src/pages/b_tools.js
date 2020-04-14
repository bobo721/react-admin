// in src/pages/b_tool.js
import React from 'react';
import { List, NumberInput, ReferenceInput, FunctionField, Datagrid, Edit, ReferenceField, EditButton, Create, SelectInput, SimpleForm, TextField, DateInput, DateField, Filter, TextInput, BooleanInput, NumberField } from 'react-admin';





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
            <ReferenceField label="User" source="UserId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Tool" source="ToolId" reference="tools">
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
            <ReferenceInput source="UserId" reference="users"><SelectInput optionText="name" /></ReferenceInput>
            <ReferenceInput source="ToolId" reference="tools"><SelectInput optionText="code" /></ReferenceInput>
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
            <ReferenceInput source="UserId" reference="users"><SelectInput optionText="name" /></ReferenceInput>
            <ReferenceInput source="ToolId" reference="tools"><SelectInput optionText="code" /></ReferenceInput>
        </SimpleForm>
    </Edit>
);