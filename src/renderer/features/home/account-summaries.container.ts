import { IconName } from 'evergreen-ui';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { AccountSelectors } from '../../store/account/account.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import { accountTypeIconNames } from '../../utils/account.utils';
import { formatDateFull } from '../../utils/date.util';
import { AccountSummaries } from './account-summaries.component';
import { IAccountSummariesStateProps } from './account-summaries.props.interface';

const accountSummarySelector = createSelector(AccountSelectors.accounts, RecordSelectors.records, (accounts, records) =>
  Object.keys(accounts).map(id => {
    const account = accounts[id];
    const accountRecords = records[id];
    const lastRecord = accountRecords?.[accountRecords.length - 1];
    return {
      accountId: account.id,
      balance: lastRecord?.balance,
      dateOfLastTransaction: lastRecord ? formatDateFull(lastRecord.date) : undefined,
      iconName: accountTypeIconNames[account.accountType] as IconName,
      name: account.name,
    };
  })
);

function mapStateToProps(state: IStore): IAccountSummariesStateProps {
  return { accounts: accountSummarySelector(state) };
}

export const AccountSummariesContainer = connect(mapStateToProps)(AccountSummaries);
