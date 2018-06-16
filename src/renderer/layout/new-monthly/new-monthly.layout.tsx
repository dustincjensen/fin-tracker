import * as React from 'react';
import NewImportFilePickerContainer from '../../containers/new-import-file-picker.container';
import NewImportRecordTableContainer from '../../containers/new-import-record-table.container';
import { Dispatch } from 'redux';
import IStore from '../../store/store.interface';
import IRecord from '../../store/records/record.interface';

interface INewMonthlyProps {
  filePickerText: string;
  newFileSelectedAction: (dispatch: Dispatch, filePath: string) => void;
  stateSelector: (state: IStore) => IRecord[];
}

export default class NewMonthly extends React.Component<INewMonthlyProps> {
  render() {
    return (
      <div>
        <NewImportFilePickerContainer {...this.props} />
        {/* <NewImportRecordTableContainer {...this.props} /> */}
      </div>
    );
  }
}
