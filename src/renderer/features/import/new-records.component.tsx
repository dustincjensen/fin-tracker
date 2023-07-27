import { Button, FilePicker, FormField, Heading, majorScale, Pane, SelectField, Alert, ImportIcon } from 'evergreen-ui';
import React from 'react';
import { IAccount } from '../../store/account/account.interface';
import { ParseType } from '../../store/pending-record/parse.type';
import { isNullOrUndefined } from '../../utils/object.utils';
import { useNewRecords } from './use-new-records.hook';

const getAccountOptions = (accounts: IAccount[]) =>
  accounts.map(a => (
    <option key={a.id} value={a.id}>
      {a.name}{' '}
    </option>
  ));

const getImportOptions = () => (
  <>
    <option key='quicken' value='Quicken'>
      Quicken (*.qif)
    </option>
    <option key='qfx' value='QFX'>
      Quicken (*.qfx)
    </option>
  </>
);

type NewRecordsProps = {
  /**
   * When navigating from an account we receive an ID,
   * so we can pre-fill the selector.
   */
  accountId: string | undefined;
};

export const NewRecords = ({ accountId }: NewRecordsProps) => {
  const { accounts, autoCategories, error, importAction } = useNewRecords();

  const [selectedAccountId, setSelectedAccountId] = React.useState(accountId || accounts?.[0]?.id || '');
  const [selectedFile, setSelectedFile] = React.useState<File>(null);
  const [importMethod, setImportMethod] = React.useState<ParseType>('QFX');
  const [formError, setFormError] = React.useState('');

  const handleFileSelected = (files: FileList) => {
    if (files) {
      setSelectedFile(files[0]);
    }
  };
  const handleAccountChange = evt => setSelectedAccountId(evt.target.value);
  const handleImportMethodChange = evt => setImportMethod(evt.target.value);

  const handleSubmit = evt => {
    evt.preventDefault();

    // Don't do anything if the form isn't properly filled out.
    if (isNullOrUndefined(selectedFile) || selectedAccountId === '') {
      setFormError('Please select a file to import.');
      return;
    }

    const selectedAccount = accounts.filter(a => a.id === selectedAccountId)[0];
    const selectedAutoCategories = autoCategories[selectedAccountId];

    importAction(selectedAccount, selectedAutoCategories, selectedFile, importMethod);
    setFormError(undefined);
  };

  return (
    <Pane border padding={20} background='tint1' borderRadius={5}>
      <Pane borderBottom display='flex' alignItems='center' marginBottom={20} paddingBottom={10}>
        <ImportIcon size={25} marginRight={10} color='default' />
        <Heading size={700}>Import</Heading>
      </Pane>

      <form onSubmit={handleSubmit}>
        <Pane>
          <FormField label='File' description='Select a file that contains records for new months.'>
            <FilePicker width={350} name='import-file-picker' marginBottom={20} onChange={handleFileSelected} />
          </FormField>
          <SelectField
            width={350}
            label='Account'
            description='The account to import the new records to.'
            value={selectedAccountId}
            onChange={handleAccountChange}
          >
            {getAccountOptions(accounts)}
          </SelectField>
          <SelectField
            width={350}
            label='Import Type'
            description='The method used to import the records. This should match the file type downloaded.'
            value={importMethod}
            onChange={handleImportMethodChange}
          >
            {getImportOptions()}
          </SelectField>
        </Pane>
        <Pane borderTop paddingTop={10}>
          {(formError || error) && (
            <Pane>
              <Alert intent='danger' title={formError || error} />
            </Pane>
          )}
          <Pane display='flex' justifyContent='flex-end' paddingTop={10}>
            <Button appearance='primary' height={majorScale(5)} iconBefore={ImportIcon}>
              Import
            </Button>
          </Pane>
        </Pane>
      </form>
    </Pane>
  );
};
