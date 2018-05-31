import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import IStore from '../store/store.interface';
import FilePicker from '../components/file-picker/file-picker.component';
import FilePickerProps from '../components/file-picker/file-picker.props';
import { NewFilesSelected } from '../store/new-file/new-file.actions';

const mapDispatchToProps = (dispatch: Dispatch): FilePickerProps => {
  const props: FilePickerProps = {
    filesSelected: (files) => dispatch(NewFilesSelected(files))
  }
  return props;
};

export default connect(null, mapDispatchToProps)(FilePicker);
