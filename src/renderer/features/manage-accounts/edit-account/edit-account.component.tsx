import {
  Alert,
  Button,
  FormField,
  Heading,
  InlineAlert,
  Pane,
  SelectField,
  Text,
  TextInputField,
  majorScale,
  BankAccountIcon,
  BanCircleIcon,
  EyeOpenIcon,
  FloppyDiskIcon,
  UnarchiveIcon,
  ArchiveIcon,
} from 'evergreen-ui';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IAccount } from '../../../store/account/account.interface';
import { AccountType } from '../../../store/account/account.type';
import { accountTypeNameValuePairs, accountTypeLabels, isBankAccount, isInvestmentAccount, accountRoutes } from '../../../utils/account.utils';
import { monthValues, monthNamesLong } from '../../../utils/date.utils';
import { newGuid } from '../../../utils/guid.utils';
import { isNullOrUndefined } from '../../../utils/object.utils';
import { IEditAccountProps } from './edit-account.props.interface';

// TODO review component. There is a lot going on here with archived and handling both new/existing accounts. Might be worth breaking it up.
export const EditAccount = ({
  close,
  saveAccount,
  saveButtonText,
  headerText,
  account,
  canEditComplexFields,
  currentBalance,
  isNew,
  archiveAccount,
  lastTransactionDate,
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

    const at = accountType as AccountType;
    const updatedAccount: IAccount = {
      id: account?.id || newGuid(),
      name,
      startYear,
      startMonth,
      startingBalance: isBankAccount(at) ? startingBalance : undefined,
      // Todo fix typing
      accountType: at,
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

  const handleArchiveAccount = () => {
    const [endYear, endMonth] = lastTransactionDate;
    const archiving = !account.archived;
    archiveAccount(account.id, archiving, archiving ? endYear : undefined, archiving ? endMonth : undefined);
  };

  const canArchive = !isNullOrUndefined(currentBalance) && currentBalance === 0.0;

  return (
    <Pane padding={20} background='tint1' border={!account} borderRadius={!account ? 5 : 0}>
      {headerText && (
        <Pane borderBottom display='flex' alignItems='center' marginBottom={20} paddingBottom={10}>
          <BankAccountIcon size={25} marginRight={10} color='default' />
          <Heading size={700}>{headerText}</Heading>
        </Pane>
      )}

      {!canEditComplexFields && (
        <Alert
          title={
            account?.archived
              ? 'Account is archived.'
              : 'Editing is limited because records have already been imported for this account.'
          }
          marginBottom={majorScale(3)}
        />
      )}
      <form onSubmit={handleSubmit}>
        <Pane display='grid' gridTemplateColumns='1fr 1fr'>
          {/* Left Side */}
          <Pane>
            {!account?.archived && (
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
            )}
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
                {isBankAccount(accountType as AccountType) && (
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
                )}
              </>
            )}
            {!canEditComplexFields && (
              <>
                {account?.archived && (
                  <FormField label='Name' marginBottom={majorScale(3)}>
                    <Text>{name}</Text>
                  </FormField>
                )}
                <FormField label='Account Type' marginBottom={majorScale(3)}>
                  <Text>{accountTypeLabels[accountType]}</Text>
                </FormField>
                <FormField label='Start Year' marginBottom={majorScale(3)}>
                  <Text>{startYear}</Text>
                </FormField>
                <FormField label='Starting Month' marginBottom={majorScale(3)}>
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

          {/* Right Side */}
          {!isNew && (
            <Pane display='flex' flexDirection='column' justifyContent='space-between' borderLeft paddingLeft={10}>
              {/* Top */}
              <Pane>
                {/* TODO this is a great writeup for a help page. */}
                {/* Archiving an account lets you remove it from the home page and left hand navigation menu, while keeping all the data around for graphs and data displays. */}
                <Button
                  type='button'
                  iconAfter={account?.archived ? UnarchiveIcon : ArchiveIcon}
                  width='100%'
                  appearance='primary'
                  disabled={!canArchive}
                  onClick={handleArchiveAccount}
                >
                  {account?.archived ? 'Re-activate Account' : 'Archive Account'}
                </Button>
                {!canArchive && (
                  <InlineAlert marginTop={5} marginLeft={3}>
                    {
                      // Basically means there are no records if the current balance is undefined
                      isNullOrUndefined(currentBalance)
                        ? 'Empty accounts should be deleted instead of archived.'
                        : 'To archive, the account must have a current balance of $0.00'
                    }
                  </InlineAlert>
                )}
              </Pane>

              {/* Bottom */}
              <Pane display='flex' flexDirection='column' justifyContent='flex-end'>
                <FormField label='End Year' marginBottom={majorScale(3)}>
                  <Text>{account?.endYear || '-'}</Text>
                </FormField>
                <FormField label='End Month' marginBottom={majorScale(3)}>
                  <Text>{(account && monthNamesLong()[account?.endMonth]) || '-'}</Text>
                </FormField>
                <FormField label='Current Balance' marginBottom={majorScale(3)}>
                  {isBankAccount(account?.accountType) && 
                    <Text>{(!isNullOrUndefined(currentBalance) && currentBalance.toFixed(2)) || '-'}</Text>
                  }
                  {isInvestmentAccount(account?.accountType) && 
                    <Text>Calculated value</Text>
                  }
                </FormField>
              </Pane>
            </Pane>
          )}
        </Pane>

        <Pane display='flex' justifyContent='flex-end' borderTop paddingTop={10}>
          {close && (
            <Button type='button' iconBefore={BanCircleIcon} height={majorScale(5)} onClick={close}>
              Cancel
            </Button>
          )}
          {account?.archived && (
            <Button
              is={Link}
              to={`${accountRoutes[account?.accountType]}/${account?.id}`}
              type='button'
              iconBefore={EyeOpenIcon}
              height={majorScale(5)}
              marginLeft={10}
            >
              View Account
            </Button>
          )}
          {!account?.archived && (
            <Button appearance='primary' iconBefore={FloppyDiskIcon} height={majorScale(5)} marginLeft={10}>
              {saveButtonText}
            </Button>
          )}
        </Pane>
      </form>
    </Pane>
  );
};
