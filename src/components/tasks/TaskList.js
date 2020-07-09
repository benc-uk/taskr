import React from 'react';

import { Flex, Text, List } from "@fluentui/react-northstar";

const TaskList = (props) => {

    

    if (!props.tasks || props.tasks.length === 0) {
        return (
            <Flex>
                <Text content="Quick! Go add a task!" />
            </Flex>
        );
    }

    // list of items
    const items = props.tasks.map(task => {
        return (
            {
                key: task.id,
                header: task.title,
                content: task.notes,
            }
        );
    });

    return (
        <List items={items}>
        </List>
    );
};

export default TaskList;