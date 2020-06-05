import React, { useState } from 'react';
import { Stack, TextField, PrimaryButton } from "@fluentui/react";

function AddTask(props) {

    const [taskName, setTaskName] = useState("");
    const addTask = () => {
        props.addTask(taskName);
        setTaskName("");
    };
    const setTask = (e) => {
        setTaskName(e.target.value);
    };

    return (
        <Stack>
            <Stack horizontal >
                <Stack.Item grow>
                    <TextField placeholder="Add new item" value={taskName} onChange={setTask} />
                </Stack.Item>
                <PrimaryButton onClick={addTask}>Add</PrimaryButton>
            </Stack>
        </Stack>
    );
}

export default AddTask;