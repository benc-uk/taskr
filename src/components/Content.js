import React from 'react';

import { TaskContainer } from './tasks';

const Content = (props) => {
    return (
        <div>
            <TaskContainer {...props} />
        </div>
    );
};

export default Content;