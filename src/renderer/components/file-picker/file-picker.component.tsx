import * as React from 'react';
import './file-picker.component.scss';

export class FilePicker extends React.Component {

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

    // TODO do something with the files.
    console.log(files);
  };

  render() {
    return (
      <div>
        <input ref={this.inputOpenFileRef} type="file" style={{ display: "none" }} onChange={this.onFileSelected} />
        <button onClick={this.openFileDialog} className="select-btn">Select file</button>
      </div>
    );
  }
}
