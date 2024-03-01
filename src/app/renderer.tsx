import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { BackgroundWorkerProvider } from './background-worker-provider.component';
import { RootLayout } from './features/root/root.layout';
import { toastMiddleware } from './store/middleware/toast.middleware';
import { migrations } from './store/migrations';
import { rootReducer } from './store/store';
import { IPersistedStore } from './store/store.interface';
import './renderer.css';

const ElectronStore = require('electron-store');

// TODO in future releases should add "value => JSON.stringify(value)" to reduce file size.
const storage = new ElectronStore({
    name: 'appState',
    migrations,
});
const store = createStore(rootReducer, storage.get('state') || {}, applyMiddleware(toastMiddleware));

store.subscribe(() => {
    // TODO should we have a delay before setting the state? Subscribe gets called often.
    const state = store.getState();
    const persistedState: IPersistedStore = {
        accounts: state.accounts,
        autoCategories: state.autoCategories,
        categories: state.categories,
        investmentRecords: state.investmentRecords,
        records: state.records,
        thirdPartyApi: state.thirdPartyApi,
    };
    storage.set('state', persistedState);
});

ReactDOM.render(
    <Provider store={store}>
        <BackgroundWorkerProvider>
            <HashRouter>
                <RootLayout />
            </HashRouter>
        </BackgroundWorkerProvider>
    </Provider>,
    document.getElementById('react-render-location')
);
