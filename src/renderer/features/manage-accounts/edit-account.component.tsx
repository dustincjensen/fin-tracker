import {
  Text,
  Button,
  Heading,
  Icon,
  majorScale,
  Pane,
  SelectField,
  TextInputField,
  Alert,
  FormField,
} from 'evergreen-ui';
import * as React from 'react';
import { IAccount } from '../../store/account/account.interface';
import { AccountType } from '../../store/account/account.type';
import { accountTypeNameValuePairs, accountTypeLabels } from '../../utils/account.utils';
import { monthValues, monthNamesLong } from '../../utils/date.util';
import { newGuid } from '../../utils/guid.util';
import { IEditAccountProps } from './edit-account.props.interface';

export const EditAccount = ({
  close,
  saveAccount,
  saveButtonText,
  headerText,
  account,
  canEditComplexFields,
}: IEditAccountProps) => {
  const [name, setName] = React.useState<string>(account?.name || '');
  const [startYear, setStartYear] = React.useState<number>(account?.startYear || new Date().getFullYear());
  const [startMonth, setStartMonth] = React.useState<number>(account?.startMonth || new Date().getMonth());
  const [startingBalance, setStartingBalance] = React.useState<number>(account?.startingBalance || 0.0);
  const [accountType, setAccountType] = React.useState<AccountType | ''>(account?.accountType || '');

  const handleNameChange = evt => setName(evt.target.value);
  const handleStartYearChange = evt => setStartYear(evt.target.value);
  const handleStartMonthChange = evt => setStartMonth(evt.target.value);
  const handleStartingBalanceChange = evt => setStartingBalance(evt.target.value);
  const handleAccountTypeChange = evt => setAccountType(evt.target.value);

  const handleSubmit = evt => {
    evt.preventDefault();

    const updatedAccount: IAccount = {
      id: account?.id || newGuid(),
      name,
      startYear,
      startMonth,
      startingBalance,
      // Todo fix typing
      accountType: accountType as AccountType,
    };

    saveAccount(updatedAccount);
    if (close) {
      close();
    } else {
      setName('');
      setStartYear(new Date().getFullYear());
      setStartMonth(new Date().getMonth());
      setStartingBalance(0.0);
      setAccountType('');
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
              <SelectField
                width={350}
                label='Account Type'
                name='accountType'
                value={accountType}
                onChange={handleAccountTypeChange}
                required
              >
                <option value={undefined}></option>
                {accountTypeNameValuePairs.map(a => (
                  <option key={a.value} value={a.value}>
                    {a.name}
                  </option>
                ))}
              </SelectField>
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
                {monthValues.map(m => (
                  <option key={m.value} value={m.value}>
                    {m.month}
                  </option>
                ))}
              </SelectField>
              <TextInputField
                width={350}
                label='Starting Balance'
                name='startingBalance'
                type='number'
                value={startingBalance}
                onChange={handleStartingBalanceChange}
                step={0.01}
                required
              />
            </>
          )}
          {!canEditComplexFields && (
            <>
              <FormField label='Account Type' marginBottom={majorScale(3)}>
                <Text>{accountTypeLabels[accountType]}</Text>
              </FormField>
              <FormField label='Start Year' marginBottom={majorScale(3)}>
                <Text>{startYear}</Text>
              </FormField>
              <FormField label='Starting Month' marginBottom={majorScale(3)}>
                {/* TODO fix the typing of the options from '0' to 0 */}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Text>{monthNamesLong()[startMonth]}</Text>
              </FormField>
              <FormField label='Starting Balance' marginBottom={majorScale(3)}>
                {/* TODO fix number/string typing and parsing? */}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Text>{parseFloat(startingBalance as any).toFixed(2)}</Text>
              </FormField>
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
