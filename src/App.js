import React, { useState } from 'react';
import './App.css';
import { Stack } from "@fluentui/react";
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
  const [tasks, setTasks] = useState([{ id: 1, name: "Task Item 1" }, { id: 2, name: "Task Item 2" }]);

  const addTask = (taskName) => {
    if (taskName !== "") {
      const newId = tasks.length + 1;
      const newTasks = [...tasks, { id: newId, name: taskName }];
      setTasks(newTasks);
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <Stack horizontalAlign="center">
          <h1>taskr</h1>
          <Stack style={{ width: 300 }} gap={25}>
            <AddTask addTask={addTask} />
            <TaskList tasks={tasks} />
          </Stack>
        </Stack>
      </div>
    </div>
  );
}

export default App;  