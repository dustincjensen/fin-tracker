import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/store';
import ipcReceive from './store/ipc';
import NewImportFilePickerContainer from './containers/new-import-file-picker.container';
import NewImportRecordTableContainer from './containers/new-import-record-table.container';
import Tabs from './components/tabs/tabs.component';
import { NewScotiabankChequingFileSelected, NewScotiabankVisaFileSelected, NewScotiabankSavingsFileSelected } from './store/new-file/new-file.actions';

const store = createStore(rootReducer, applyMiddleware(ipcReceive));

const props = {
  tabs: [
    { id: 0, display: 'Jan' },
    { id: 1, display: 'Feb' },
    { id: 2, display: 'Mar' },
    { id: 3, display: 'Apr' },
    { id: 4, display: 'May', active: true },
    { id: 5, display: 'Jun' },
    { id: 6, display: 'Jul' },
    { id: 7, display: 'Aug' },
    { id: 8, display: 'Sep' },
    { id: 9, display: 'Oct' },
    { id: 10, display: 'Nov' },
    { id: 11, display: 'Dec' }
  ],
  selectTab: (id: number) => {
    console.log(id);
  }
};

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Tabs {...props} />
      <NewImportFilePickerContainer newFileSelectedAction={NewScotiabankVisaFileSelected} />
      <NewImportRecordTableContainer />
    </div>
  </Provider>,
  document.getElementById('root')
);
