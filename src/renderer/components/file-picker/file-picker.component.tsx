import * as React from 'react';
import './file-picker.component.scss';
import FilePickerProps from './file-picker.props';

export default class FilePicker extends React.Component<FilePickerProps> {

  private readonly inputOpenFileRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this.inputOpenFileRef = React.createRef();
  }

  openFileDialog = () => {
    this.inputOpenFileRef.current.click();
  };

  onFileSelected = (evt) => {
    const files = evt.target.files;
    if (files && files[0]) {
      this.props.fileSelected(files[0]);
    }
  };

  render() {
    return (
      <div>
        <input ref={this.inputOpenFileRef} type="file" style={{ display: "none" }} onChange={this.onFileSelected} />
        <button onClick={this.openFileDialog} className="select-btn">{this.props.buttonText}</button>
      </div>
    );
  }
}
