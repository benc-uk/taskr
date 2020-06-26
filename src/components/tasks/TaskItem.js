import React from 'react';
import { Stack, Label } from '@fluentui/react';

const TaskItem = (props) => {
    return (
        <Stack>
            <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
                <Label>{props.task.name}</Label>
            </Stack>
        </Stack>
    );
};

export default TaskItem;