import React from 'react';
import { useQuery, Loading, Error } from 'react-admin';

const BorrowCount = ({ record }) => {

    const { data, loading, error } = useQuery({ 
        type: 'getOne',
        resource: 'toolsborrow',
        payload: { id: record.id }
    });

    if (loading) return <Loading />;
    if (error) return <Error />;
    if (!data) return null;
    console.log(data);
    return (
        data[0].total_time
    )
};

export default BorrowCount;