import React from 'react';

import { Menu } from "@fluentui/react-northstar";

const Navigation = ({ view, onNavigation }) => {
    const items = [
        {
            content: 'Assigned',
            key: 'assigned',
            onClick: () => { onNavigation('assigned'); }
        },
        {
            content: 'Owned',
            key: 'owned',
            onClick: () => { onNavigation('owned'); }
        }
    ];

    return (
        <Menu items={items}
            vertical={true}
            pointing="start"
            defaultActiveIndex={items.map(i => i.key).indexOf(view)} />
    );
};

export default Navigation;

