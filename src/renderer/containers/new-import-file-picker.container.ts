import { connect, Dispatch } from 'react-redux';
import { FilePicker } from '../components/file-picker/file-picker.component';
import { FilePickerProps } from '../components/file-picker/file-picker.interface';

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

export const NewImportFilePickerContainer = connect(null, mapDispatchToProps)(FilePicker);
