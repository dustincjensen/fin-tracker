import { Button, FilePicker, FormField, Heading, Icon, majorScale, Pane, SelectField, Alert } from 'evergreen-ui';
import * as React from 'react';
import { INewRecordsProps } from './new-records.props.interface';
import { INewRecordsState } from './new-records.state.interface';

export class NewRecords extends React.Component<INewRecordsProps, INewRecordsState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccountId: props.accountId || props.accounts?.[0]?.id || '',
      selectedFile: null,
      importMethod: 'QFX',
    };
  }

  render() {
    const { error } = this.props;
    const { selectedAccountId, importMethod, formError } = this.state;

    return (
      <Pane border padding={20} background='tint1' borderRadius={5}>
        <Pane borderBottom display='flex' alignItems='center' marginBottom={20} paddingBottom={10}>
          <Icon icon='import' size={25} marginRight={10} color='default' />
          <Heading size={700}>Import</Heading>
        </Pane>

        <form onSubmit={this.handleSubmit}>
          <Pane>
            <FormField label='File' description='Select a file that contains records for new months.'>
              <FilePicker width={350} name='import-file-picker' marginBottom={20} onChange={this.handleFileSelected} />
            </FormField>
            <SelectField
              width={350}
              label='Account'
              description='The account to import the new records to.'
              value={selectedAccountId}
              onChange={this.handleAccountChange}
            >
              {this.getAccountOptions()}
            </SelectField>
            <SelectField
              width={350}
              label='Import Type'
              description='The method used to import the records. This should match the file type downloaded.'
              value={importMethod}
              onChange={this.handleImportMethodChange}
            >
              {this.getImportOptions()}
            </SelectField>
          </Pane>
          <Pane borderTop paddingTop={10}>
            {(formError || error) && (
              <Pane>
                <Alert intent='danger' title={formError || error} />
              </Pane>
            )}
            <Pane display='flex' justifyContent='flex-end' paddingTop={10}>
              <Button appearance='primary' height={majorScale(5)} iconBefore='import'>
                Import
              </Button>
            </Pane>
          </Pane>
        </form>
      </Pane>
    );
  }

  getAccountOptions = () => {
    return this.props.accounts.map(a => {
      return (
        <option key={a.id} value={a.id}>
          {a.name}
        </option>
      );
    });
  };

  getImportOptions = () => {
    return (
      <>
        <option key='sbc' value='ScotiabankChequing'>
          Scotiabank Chequing
        </option>
        <option key='sbs' value='ScotiabankSavings'>
          Scotiabank Savings
        </option>
        <option key='sbv' value='ScotiabankVisa'>
          Scotiabank Visa
        </option>
        <option key='quicken' value='Quicken'>
          Quicken (*.qif)
        </option>
        <option key='qfx' value='QFX'>
          Quicken (*.qfx)
        </option>
      </>
    );
  };

  handleFileSelected = (files: FileList) => {
    if (files) {
      this.setState({ selectedFile: files[0] });
    }
  };

  handleAccountChange = evt => {
    this.setState({ selectedAccountId: evt.target.value });
  };

  handleImportMethodChange = evt => this.setState({ importMethod: evt.target.value });

  handleSubmit = evt => {
    evt.preventDefault();
    const { selectedFile, selectedAccountId, importMethod } = this.state;

    // Don't do anything if the form isn't properly filled out.
    if (selectedFile === null || selectedAccountId === '') {
      this.setState({ formError: 'Please select a file to import.' });
      return;
    }

    const { accounts, autoCategories } = this.props;
    const selectedAccount = accounts.filter(a => a.id === selectedAccountId)[0];
    const selectedAutoCategories = autoCategories[selectedAccountId];

    this.props.importAction(selectedAccount, selectedAutoCategories, selectedFile, importMethod);
    this.setState({ formError: undefined });
  };
}
