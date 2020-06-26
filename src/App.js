import React from 'react';

import Navigation from './components/Navigation';
import Content from './components/Content';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>taskr</h1>
      <div className="wrapper">
        <Navigation />
        <Content />
      </div>
    </div>
  );
};

export default App;  