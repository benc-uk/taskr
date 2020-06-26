import React, { useState, useEffect } from 'react';

import TaskList from './TaskList';
import AddTask from './AddTask';

import { saveTask, findTasksByAssignee } from '../../api';

const TaskContainer = (props) => {
    const [tasks, setTasks] = useState([]);
    const [loadingState, setLoadingState] = useState('');

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const tasks = await findTasksByAssignee('Jason');
                setLoadingState('loaded');
                setTasks(tasks);
            } catch (e) {
                console.error('Failed to find tasks ' + e.message);
            }
        };
        if (loadingState !== '') return;
        makeRequest();
    }, [loadingState]);

    const addTask = async (taskName) => {
        if (taskName !== "") {
            const newId = tasks.length + 1;
            try {
                const text = await saveTask(taskName);
                const newTasks = [...tasks, { id: newId, name: text }];
                setTasks(newTasks);
            } catch (e) {
                console.error('Failed to persist task ' + e.message);
            }
        }
    };

    return (
        <div>
            <AddTask addTask={addTask} />
            <TaskList tasks={tasks} />
        </div>
    );
};

export default TaskContainer;