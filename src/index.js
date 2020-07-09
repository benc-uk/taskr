import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, teamsTheme } from '@fluentui/react-northstar';

import App from './App';

import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider theme={teamsTheme}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();