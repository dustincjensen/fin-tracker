import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { RootContainer } from './features/root/root.container';
import { AppActions } from './store/app/app.actions';
import { ipcReceive } from './store/ipc';
import { toastMiddleware } from './store/middleware/toast.middleware';
import { rootReducer } from './store/store';
import { IStore } from './store/store.interface';
import './renderer.scss';

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thunk as ThunkMiddleware<IStore, any>,
    ipcReceive,
    toastMiddleware
  )
);

store.dispatch({ type: AppActions.INITIALIZE });

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <RootContainer />
    </HashRouter>
  </Provider>,
  document.getElementById('react-render-location')
);
