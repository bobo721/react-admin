import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNotify, useRedirect, fetchStart, fetchEnd, Button } from 'react-admin';

const BorrowCount = ({ record }) => {
    const dispatch = useDispatch();
    const notify = useNotify();
    const [loading, setLoading] = useState(false);
        setLoading(true);
        fetch(`/api/toolsborrow/${record.id}`, { method: 'GET'})
            .then((response) => {
                    return response.json();
            })
            .catch((e) => {
                notify('Error: comment not approved', 'warning')
            })
            .finally(() => {
                setLoading(false);
            });
};

export default BorrowCount;