import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { RootLayout } from './features/root/root.layout';
import { ipcReceive } from './store/ipc';
import { rootReducer } from './store/store';
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
