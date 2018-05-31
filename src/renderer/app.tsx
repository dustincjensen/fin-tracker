import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/store';
import ipcReceive from './store/ipc';
import NewImportFilePickerContainer from './containers/new-import-file-picker.container';
import NewImportRecordTableContainer from './containers/new-import-record-table.container';

const store = createStore(rootReducer, applyMiddleware(ipcReceive));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <NewImportFilePickerContainer />
      <NewImportRecordTableContainer />
    </div>
  </Provider>,
  document.getElementById('root')
);
