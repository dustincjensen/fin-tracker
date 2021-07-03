import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { RootLayout } from './features/root/root.layout';
import { ipcReceive } from './store/ipc';
import { toastMiddleware } from './store/middleware/toast.middleware';
import { rootReducer } from './store/store';
import { IPersistedStore } from './store/store.interface';
import './renderer.css';

const ElectronStore = require('electron-store');

// TODO in future releases should add "value => JSON.stringify(value)" to reduce file size.
const storage = new ElectronStore({ name: 'appState' });
const store = createStore(rootReducer, storage.get('state') || {}, applyMiddleware(ipcReceive, toastMiddleware));

store.subscribe(() => {
  // TODO should we have a delay before setting the state? Subscribe gets called often.
  const state = store.getState();
  const persistedState: IPersistedStore = {
    accounts: state.accounts,
    autoCategories: state.autoCategories,
    categories: state.categories,
    records: state.records,
  };
  storage.set('state', persistedState);
});

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <RootLayout />
    </HashRouter>
  </Provider>,
  document.getElementById('react-render-location')
);
