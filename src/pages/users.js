// in src/pages/users.js
import React from 'react';
import { List, Edit, Show, ReferenceField, RichTextField, DateField, NumberField, BooleanField, ReferenceManyField, Create,TabbedShowLayout, Tab, SimpleForm, EditButton, Datagrid, TextField, EmailField, Filter, TextInput } from 'react-admin';

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <TextInput label="Title" source="name" defaultValue="" />
    </Filter>
);

export const UserList = props => (
    <List {...props} filters={<UserFilter />}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="address.street" />
            <TextField source="phone" />
            <TextField source="website" />
            <TextField source="company.name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const UserShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <TextField label="Id" source="id" />
                <TextField source="name" />
                <TextField source="email" />
            </Tab>
            <Tab label="body" path="body">
                <RichTextField source="name" addLabel={false} />
            </Tab>
            <Tab label="Miscellaneous" path="miscellaneous">
                <TextField label="Password (if protected post)" source="password" type="password" />
                <DateField label="Publication date" source="published_at" />
                <NumberField source="average_note" />
                <BooleanField label="Allow comments?" source="commentable" defaultValue />
                <TextField label="Nb views" source="views" />
            </Tab>
            <Tab label="tools">
                <ReferenceManyField reference="b_tools" target="UserId" addLabel={false}>
                    <Datagrid>
                        <ReferenceField source="ToolId" reference="Tools">
                            <TextField source="code" />
                        </ReferenceField>
                        <DateField source="created_at" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled  source="id" />
            <TextInput source="name" />
            <TextInput source="email" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="name" />
            <TextInput source="email" />
        </SimpleForm>
    </Create>
);