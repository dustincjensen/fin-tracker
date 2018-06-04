import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/store';
import ipcReceive from './store/ipc';
import RootLayout from './layout/root/root.layout';

import './renderer.scss';

const store = createStore(rootReducer, applyMiddleware(ipcReceive));

ReactDOM.render(
  <Provider store={store}>
    <RootLayout />
  </Provider>,
  document.getElementById('react-render-location')
);
