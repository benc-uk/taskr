import React from 'react';
import { Stack, Label } from "@fluentui/react";
import TaskItem from './TaskItem';

function TaskList(props) {

    return (
        <Stack gap={10} >
            { props.tasks.length > 0 ? props.tasks.map((task) => (
                <TaskItem task={task} key={task.id}/>
            )): 
            <Label>Task list is empty...</Label>}
        </Stack>
    );
}

export default TaskList;