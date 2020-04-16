// in src/pages/users.js
import React, {loading} from 'react';
import {SelectInput, useMutation, SimpleShowLayout, useRefresh, useNotify, Button, List, Edit, Show, ReferenceField, RichTextField, DateField, NumberField, BooleanField, ReferenceManyField, Create,TabbedShowLayout, Tab, SimpleForm, EditButton, Datagrid, TextField, EmailField, Filter, TextInput } from 'react-admin';

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



export const UserShow = (props) => {
    console.log("user props");
    console.log(props);




    const ReturnButton = ({ record }) => {
        const notify = useNotify();
        const refresh = useRefresh();
        const [approve, { loading }] = useMutation(
            {
                type: 'update',
                resource: 'b_tools',
                payload: { id: record.id, data: { active: false } },
            },
            {
                onSuccess: ({ data }) => {
                    notify('Nářadí vráceno');
                    refresh();
                    
                },
                onFailure: (error) => notify(`Comment approval error: ${error.message}`, 'warning'),
            }
        );

        const [tool_update] = useMutation(
            {
                type: 'update',
                resource: 'tools',
                payload: { id: record.ToolId, data: { free: true } },
            },
            {
                onSuccess: ({ data }) => {
                    notify('Nářadí uvolněno');
                    
                    
                },
                onFailure: (error) => notify(`Comment approval error: ${error.message}`, 'warning'),
            }
        );
        return <Button label="Vrátit nářadí" onClick={() => {
            approve();
            tool_update();
          }} disabled={loading} />;
    };

    const BorrowButton = ({ record }) => {
        const notify = useNotify();
        const refresh = useRefresh();
        console.log(record, props);
        const [borrow, { loading }] = useMutation(
            {
                type: 'create',
                resource: 'b_tools',
                payload: { data: { active: true, UserId: props.id, ToolId: record.id  } },
            },
            {
                onSuccess: ({ data }) => {
                    notify('Nářadí půjčeno');
                    
                    
                },
                onFailure: (error) => notify(`Comment approval error: ${error.message}`, 'warning'),
            }
        );
        const [tool_update] = useMutation(
            {
                type: 'update',
                resource: 'tools',
                payload: { id: record.id, data: { free: false } },
            },
            {
                onSuccess: ({ data }) => {
                    notify('Nářadí rezervováno');
                    refresh();
                    
                },
                onFailure: (error) => notify(`Comment approval error: ${error.message}`, 'warning'),
            }
        );

        return <Button label="Půjčit nářadí" onClick={() => {
            borrow();
            tool_update();
          }} disabled={loading} />;


    };


    return(
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
           
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
            <Tab label="Nářadí">
            
            <ReferenceManyField filter={{free: 1}}  reference="tools" target="null" addLabel={false} sort={{ field: 'created_at', order: 'DESC' }}>
                                               
                    <Datagrid>  
                        <TextField source="free"/>         
                        <TextField source="code"/>
                        <TextField source="name"/>
                        <TextField source="state"/>
                        <BorrowButton/>
                    </Datagrid>
                
            </ReferenceManyField>
            


            </Tab>
            <Tab label="Vypujčené nářadí">
           
                <ReferenceManyField filter={{active: 1}}  reference="b_tools" target="UserId" addLabel={false} sort={{ field: 'created_at', order: 'DESC' }}>                                
                    <Datagrid>         
                        <ReferenceField label="Tool" source="ToolId" reference="tools">
                            <TextField source="code" />
                        </ReferenceField>
                        <NumberField source="active"/>
                        <NumberField source="time"/>
                        <ReferenceField label="Tool" source="ToolId" reference="tools">
                        
                        <TextField source="state" />
                        
                        </ReferenceField>
                        <ReturnButton/>
                    </Datagrid>

                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
        </SimpleShowLayout>
    </Show>
    )};

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