import React, { useState } from 'react';

import { Flex, Header } from "@fluentui/react-northstar";

import Authenticator from './components/Authenticator';
import Navigation from './components/Navigation';
import Content from './components/Content';

import './App.css';

const App = () => {

  const [view, setView] = useState('assigned');
  const [userId, setUserId] = useState(null);

  return (
    <div className="App">
      <Header content="taskr" />
      <Authenticator onLoggedIn={(id) => { setUserId(id); }}>
        <Flex>
          <Navigation view={view} onNavigation={setView} />
          <Content view={view} userId={userId} />
        </Flex>
      </Authenticator>
    </div>
  );
};

export default App;  