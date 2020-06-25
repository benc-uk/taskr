import React, { useState } from 'react';
import './App.css';
import { Stack } from "@fluentui/react";
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

const persistTask = async (taskName) => {
  // bare minimum task object
  let task = {
    "title": taskName,
    "notes": "This is a test, bye!",
    "owner": "HarryHill"
  };

  let response = await fetch(`${process.env.REACT_APP_API}/tasks`, { 
    method: 'POST', 
    body: JSON.stringify(task) 
  });

  let respData = await response.json();

  if(response.ok) {
    return respData.title;
  } else {
    // API should return error details as JSON
    console.log("API ERROR", JSON.stringify(respData));
    throw new Error(respData);
  }
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