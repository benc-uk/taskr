import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Fabric } from "@fluentui/react";

ReactDOM.render(
  <React.StrictMode>
    <Fabric>
      <App />
    </Fabric>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();