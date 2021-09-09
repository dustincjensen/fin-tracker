import {
  Pane,
  Card,
  Heading,
  Text,
  Strong,
  IconButton,
  Tooltip,
  DollarIcon,
  EyeOpenIcon,
  ImportIcon,
  Icon,
} from 'evergreen-ui';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import { AccountSelectors } from '../../store/account/account.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import { accountTypeIcons } from '../../utils/account.utils';
import { formatDateFull } from '../../utils/date.utils';
import { isNullOrUndefined } from '../../utils/object.utils';
import { IAccountSummaryProps } from './account-summary.props.interface';

const accountSummarySelector = createSelector(
  AccountSelectors.account, 
  RecordSelectors.records, 
  (account, records) => {
    if (account.archived) {
      return undefined;
    }

    const accountRecords = records[account.id];
    const lastRecord = accountRecords?.[accountRecords.length - 1];
    
    return {
      balance: lastRecord?.balance,
      dateOfLastTransaction: lastRecord ? formatDateFull(lastRecord.date) : undefined,
      name: account.name,
      icon: accountTypeIcons[account.accountType],
    };
});

export const AccountSummary = ({ accountId }: IAccountSummaryProps) => {
  const { name, balance, dateOfLastTransaction, icon } = useSelector((state: IStore) => accountSummarySelector(state, accountId));

  return (
    <Card
      elevation={1}
      minWidth={300}
      maxWidth={300}
      background='tint1'
      marginBottom={20}
      marginRight={20}
      padding={10}
      paddingBottom={5}
      border
    >
      <Pane display='flex' flexDirection='column' height='100%' justifyContent='space-between'>
        <Pane borderBottom display='flex' alignItems='center' marginBottom={10} paddingBottom={5}>
          <Icon icon={icon} marginRight={5} color='default' />
          <Heading>{name}</Heading>
        </Pane>
        {!isNullOrUndefined(balance) && (
          <Pane data-name='account-details' marginBottom={10}>
            <Pane display='flex' alignItems='center'>
              <Pane width={105}>
                <Text color='muted'>Balance:</Text>
              </Pane>
              <DollarIcon color='default' size={12} marginLeft={10} />
              <Strong>{balance}</Strong>
            </Pane>
            <Pane display='flex' alignItems='center'>
              <Pane width={105}>
                <Text color='muted'>Last Transaction:</Text>
              </Pane>
              <Strong marginLeft={12}>{dateOfLastTransaction}</Strong>
            </Pane>
          </Pane>
        )}
        {isNullOrUndefined(balance) && (
          <Pane data-name='empty-account' marginBottom={10} padding={10} display='flex' justifyContent='center'>
            <Text color='muted'>
              Empty! Import records{' '}
              <Text is={Link} to={`/import/${accountId}`}>
                here
              </Text>
              .
            </Text>
          </Pane>
        )}
        <Pane display='flex' justifyContent='flex-end' borderTop paddingTop={5}>
          <Tooltip content='Open Account'>
            <IconButton appearance='minimal' icon={EyeOpenIcon} is={Link} to={`/account/${accountId}`} />
          </Tooltip>
          <Tooltip content='Import Records'>
            <IconButton appearance='minimal' icon={ImportIcon} is={Link} to={`/import/${accountId}`} />
          </Tooltip>
        </Pane>
      </Pane>
    </Card>
  );
};
