import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import IStore from '../store/store.interface';
import FilePicker from '../components/file-picker/file-picker.component';
import FilePickerProps from '../components/file-picker/file-picker.props';

interface INewImportFilePickerOwnProps {
  filePickerText: string;
  newFileSelectedAction: (dispatch: Dispatch, filePath: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INewImportFilePickerOwnProps): FilePickerProps => {
  const props: FilePickerProps = {
    buttonText: ownProps.filePickerText,
    fileSelected: (file) => ownProps.newFileSelectedAction(dispatch, file.path)
  };
  return props;
};

export default connect(null, mapDispatchToProps)(FilePicker);
