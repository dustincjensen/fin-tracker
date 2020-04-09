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
import './renderer.scss';

// TODO change implementation of initial state.
const initialState = JSON.parse(localStorage.getItem('reduxStore') || '{}');
const store = createStore(rootReducer, initialState || {}, applyMiddleware(ipcReceive, toastMiddleware));

store.subscribe(() => {
  // TODO We shouldn't set local storage so quickly, subscribe gets called often.
  const state = store.getState();
  const persistedState: IPersistedStore = {
    accounts: state.accounts,
    autoCategories: state.autoCategories,
    categories: state.categories,
    records: state.records
  };
  const serializedState = JSON.stringify(persistedState);
  localStorage.setItem('reduxStore', serializedState);
});

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <RootLayout />
    </HashRouter>
  </Provider>,
  document.getElementById('react-render-location')
);
