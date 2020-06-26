import React from 'react';

import { Stack } from "@fluentui/react";

import { TaskContainer } from './tasks';

const Content = () => {
    return (
        <Stack horizontalAlign="center">
            <Stack gap={25}>
                <TaskContainer />
            </Stack>
        </Stack>
    );
};

export default Content;