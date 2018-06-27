import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter } from 'react-router-dom';
import { rootReducer } from './store/store';
import { ipcReceive } from './store/ipc';
import { RootLayout } from './features/_root_/root.layout';
import './renderer.scss';

// TODO change implementation of initial state.
const initialState = JSON.parse(localStorage.getItem('reduxStore'));
const store = createStore(rootReducer, initialState || {}, applyMiddleware(ipcReceive));

store.subscribe(() => {
  // TODO We shouldn't set local storage so quickly, subscribe gets called often.
  localStorage.setItem('reduxStore', JSON.stringify(store.getState()));
});

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <RootLayout />
    </HashRouter>
  </Provider>,
  document.getElementById('react-render-location')
);
