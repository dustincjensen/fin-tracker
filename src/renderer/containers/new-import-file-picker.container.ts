import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import IStore from '../store/store.interface';
import FilePicker from '../components/file-picker/file-picker.component';
import FilePickerProps from '../components/file-picker/file-picker.props';
import { NewFileSelected } from '../store/new-file/new-file.actions';

const mapDispatchToProps = (dispatch: Dispatch): FilePickerProps => {
  const props: FilePickerProps = {
    fileSelected: (file) => NewFileSelected(dispatch, file.path)
  }
  return props;
};

export default connect(null, mapDispatchToProps)(FilePicker);
