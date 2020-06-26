import React, { useState, useEffect } from 'react';

import { Nav } from "@fluentui/react";

import { findUsers } from '../api';

const Navigation = () => {
    const [people, setPeople] = useState([]);
    const [loadingState, setLoadingState] = useState('');

    useEffect(() => {
        const makeRequest = async () => {
            const users = await findUsers();
            setLoadingState('loaded');
            setPeople(users);
        };
        if (loadingState !== '') return;
        makeRequest();
    }, [loadingState]);

    return (
        <Nav groups={[
            {
                links: [
                    {
                        name: 'Me',
                        url: '/',
                        key: 'key-me'
                    },
                    {
                        name: 'People',
                        url: '/people',
                        links: people.map(blob => {
                            return {
                                name: blob.name,
                                key: `key-person-${blob.id}`,
                                url: `/people/${blob.id}`
                            };
                        }),
                        isExpanded: true
                    }
                ]
            }
        ]} />
    );
};

export default Navigation;

