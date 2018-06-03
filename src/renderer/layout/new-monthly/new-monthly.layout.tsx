import * as React from 'react';
import NewImportFilePickerContainer from '../../containers/new-import-file-picker.container';
import NewImportRecordTableContainer from '../../containers/new-import-record-table.container';
import { Dispatch } from 'redux';
import IStore from '../../store/store.interface';
import { Record } from '../../store/new-file/new-file.interface';

interface INewMonthlyProps {
  newFileSelectedAction: (dispatch: Dispatch, filePath: string) => void;
  stateSelector: (state: IStore) => Record[];
}

export default class NewMonthly extends React.Component<INewMonthlyProps> {
  render() {
    const { newFileSelectedAction, stateSelector } = this.props;
    return (
      <div>
        <NewImportFilePickerContainer {...this.props} />
        <NewImportRecordTableContainer {...this.props} />
      </div>
    );
  }
}
