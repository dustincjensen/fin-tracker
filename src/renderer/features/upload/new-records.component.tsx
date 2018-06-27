import * as React from 'react';
import { FilePicker } from '../../components/file-picker/file-picker.component';
import { IAccount } from '../../store/account/account.interface';
import { IRecord } from '../../store/records/record.interface';
import './new-records.component.scss';

export interface INewRecordsStateProps {
  accounts: IAccount[];
  records: IRecord[];
}

export interface INewRecordsDispatchProps {
  uploadAction: (account: IAccount, records: IRecord[], file: File) => void;
}

interface INewRecordsState {
  selectedFile?: File;
  selectedAccountId?: string;
}

export class NewRecords extends React.Component<INewRecordsStateProps & INewRecordsDispatchProps, INewRecordsState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccountId: props.accounts && props.accounts[0] && props.accounts[0].id || '',
      selectedFile: null
    };
  }

  render() {
    const { selectedAccountId, selectedFile } = this.state;

    return (
      <div className="new-records-background">
        <div className="new-records-header">Upload Records</div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-layout">
            <FilePicker buttonText="Select File" fileSelected={this.handleFileSelected} />
            <input type="text" disabled value={selectedFile && selectedFile.name || ''} />
            <label>Accounts</label>
            <select value={selectedAccountId} onChange={this.handleAccountChange}>
              {this.getAccountOptions()}
            </select>
          </div>
          <div className="new-records-footer">
            <button className="btn btn-primary btn-lg">Save</button>
          </div>
        </form>
      </div>
    );
  }

  getAccountOptions = () => {
    return this.props.accounts.map(a => {
      return <option key={a.id} value={a.id}>{a.name}</option>;
    });
  };

  handleFileSelected = (file: File) => {
    this.setState({ selectedFile: file });
  };

  handleAccountChange = (evt) => {
    const { target } = evt;
    const { value } = target;
    this.setState({ selectedAccountId: value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { selectedFile, selectedAccountId } = this.state;

    // Don't do anything if the form isn't properly filled out.
    if (selectedFile === null || selectedAccountId === '') {
      return;
    }

    const { accounts, records } = this.props;
    const selectedAccount = accounts.filter(a => a.id === selectedAccountId)[0];
    const selectedRecords = records.filter(r => r.accountId === selectedAccountId);

    this.props.uploadAction(selectedAccount, selectedRecords, selectedFile);
    this.setState({ selectedFile: null });
  };
}
