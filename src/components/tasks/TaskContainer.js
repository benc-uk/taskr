import React, { useState, useEffect } from 'react';

import TaskList from './TaskList';
import AddTask from './AddTask';

import { findTasksByAssignee, findTasksByOwner, saveTask } from '../../api';

const TaskContainer = ({ view, userId }) => {
    const [tasks, setTasks] = useState([]);
    const [loadingState, setLoadingState] = useState('');

    useEffect(() => {
        const makeRequest = async () => {
            try {
                let tasks;
                if (view === 'owned') {
                    tasks = await findTasksByOwner(userId);
                } else {
                    tasks = await findTasksByAssignee(userId);
                }
                setLoadingState(view);
                setTasks(tasks);
            } catch (e) {
                console.error('Failed to find tasks ' + e.message);

            }
        };
        if (loadingState === view) return;
        makeRequest();
    }, [loadingState, tasks, userId, view]);

    const addTask = async (task) => {
        if (task) {
            try {
                const result = await saveTask(task);
                // this optimistically adds the newly created task
                // to the UI - but we only want to do it if we are
                // the owner or assignee, depending on the UI state
                const shouldAddResultToCurrentView =
                    (view === 'assigned' && task.assignedTo.indexOf(userId) >= 0) ||
                    (view === 'owned' && task.owner === userId);
                if (shouldAddResultToCurrentView) {
                    const newTasks = [...tasks, result];
                    setTasks(newTasks);
                }
            } catch (e) {
                console.error('Failed to persist task ' + JSON.stringify(task));
            }
        }
    };

    return (
        <div>
            <AddTask addTask={addTask} owner={userId} />
            <TaskList tasks={tasks} />
        </div>
    );
};

export default TaskContainer;