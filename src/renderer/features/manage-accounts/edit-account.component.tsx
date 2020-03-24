import { Button, Heading, Icon, majorScale, Pane, SelectField, TextInputField, Alert } from 'evergreen-ui';
import * as React from 'react';
import { IAccount } from '../../store/account/account.interface';
import { newGuid } from '../../utils/guid.util';
import { IEditAccountProps } from './edit-account.props.interface';

type ParseType = 'ScotiabankChequing' | 'ScotiabankSavings' | 'ScotiabankVisa';

export const EditAccount: React.FC<IEditAccountProps> = ({
  close,
  saveAccount,
  saveButtonText,
  headerText,
  account,
  canEditComplexFields,
}) => {
  const [name, setName] = React.useState<string>(account?.name || '');
  const [startYear, setStartYear] = React.useState<number>(account?.startYear || new Date().getFullYear());
  const [startMonth, setStartMonth] = React.useState<number>(account?.startMonth || new Date().getMonth());
  const [startingBalance, setStartingBalance] = React.useState<number>(account?.startingBalance || 0.0);
  const [parseType, setParseType] = React.useState<ParseType>(account?.parseType || 'ScotiabankChequing');

  const handleNameChange = evt => setName(evt.target.value);
  const handleStartYearChange = evt => setStartYear(evt.target.value);
  const handleStartMonthChange = evt => setStartMonth(evt.target.value);
  const handleStartingBalanceChange = evt => setStartingBalance(evt.target.value);
  const handleParseTypeChange = evt => setParseType(evt.target.value);

  const handleSubmit = evt => {
    evt.preventDefault();

    const updatedAccount: IAccount = {
      id: account?.id || newGuid(),
      name,
      startYear,
      startMonth,
      startingBalance,
      parseType,
    };

    saveAccount(updatedAccount);
    if (close) {
      close();
    } else {
      setName('');
      setStartYear(new Date().getFullYear());
      setStartMonth(new Date().getMonth());
      setStartingBalance(0.0);
      setParseType('ScotiabankChequing');
    }
  };

  return (
    <Pane padding={20} background='tint1' border={!account} borderRadius={!account ? 5 : 0}>
      {headerText && (
        <Pane borderBottom display='flex' alignItems='center' marginBottom={20} paddingBottom={10}>
          <Icon icon='bank-account' size={25} marginRight={10} color='default' />
          <Heading size={700}>{headerText}</Heading>
        </Pane>
      )}

      {!canEditComplexFields && (
        <Alert
          title='Editing is limited because records have already been imported for this account.'
          marginBottom={majorScale(3)}
        />
      )}
      <form onSubmit={handleSubmit}>
        <Pane>
          <TextInputField
            width={350}
            label='Name'
            name='name'
            value={name}
            onChange={handleNameChange}
            required
            //isInvalid={name === ''}
            //validationMessage='Please enter a category name.'
          />
          {canEditComplexFields && (
            <>
              <TextInputField
                width={350}
                label='Starting Year'
                name='startYear'
                type='number'
                value={startYear}
                onChange={handleStartYearChange}
                min={2000}
                max={2099}
                required
              />
              <SelectField
                width={350}
                label='Starting Month'
                name='startMonth'
                value={startMonth}
                onChange={handleStartMonthChange}
              >
                <option value='0'>January</option>
                <option value='1'>February</option>
                <option value='2'>March</option>
                <option value='3'>April</option>
                <option value='4'>May</option>
                <option value='5'>June</option>
                <option value='6'>July</option>
                <option value='7'>August</option>
                <option value='8'>September</option>
                <option value='9'>October</option>
                <option value='10'>November</option>
                <option value='11'>December</option>
              </SelectField>
              <TextInputField
                width={350}
                label='Starting Balance'
                name='startingBalance'
                type='number'
                value={startingBalance}
                onChange={handleStartingBalanceChange}
                min={0}
                step={0.01}
                required
              />
              <SelectField
                width={350}
                label='Account Type'
                name='parseType'
                value={parseType}
                onChange={handleParseTypeChange}
              >
                <option value='ScotiabankChequing'>Scotiabank Chequing</option>
                <option value='ScotiabankSavings'>Scotiabank Savings</option>
                <option value='ScotiabankVisa'>Scotiabank Visa</option>
              </SelectField>
            </>
          )}
        </Pane>
        <Pane display='flex' justifyContent='flex-end' borderTop paddingTop={10}>
          {close && (
            <Button type='button' iconBefore='ban-circle' height={majorScale(5)} marginRight={10} onClick={close}>
              Cancel
            </Button>
          )}
          <Button appearance='primary' iconBefore='floppy-disk' height={majorScale(5)}>
            {saveButtonText}
          </Button>
        </Pane>
      </form>
    </Pane>
  );
};
