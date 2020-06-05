import React, { useState } from 'react';
import './App.css';
import { Stack } from "@fluentui/react";
import { AppHeader, TaskList, AddTask } from './components';

const persistTask = async (task) => {
  let response = await fetch(`${process.env.REACT_APP_API}/getTest?name=${task}`);
  let text = await response.text();
  return text;
};

function App() {
  const [tasks, setTasks] = useState([{ id: 1, name: "Task Item 1" }, { id: 2, name: "Task Item 2" }]);

  const addTask = async (taskName) => {
    if (taskName !== "") {
      const newId = tasks.length + 1;
      const text = await persistTask(taskName);
      const newTasks = [...tasks, { id: newId, name: text }];
      setTasks(newTasks);
    }
  };

  return (
    <div className="App">
      <div className="App_header">
        <AppHeader />
      </div>
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