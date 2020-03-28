import { connect } from 'react-redux';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import { accountTypeIconNames } from '../../utils/account.utils';
import { formatDateFull } from '../../utils/date.util';
import { AccountSummaries } from './account-summaries.component';
import { IAccountSummariesStateProps } from './account-summaries.props.interface';

function mapStateToProps(state: IStore): IAccountSummariesStateProps {
  const accounts: IAccountSummariesStateProps['accounts'] = Object.keys(state.accounts.accounts).map(id => {
    const account = state.accounts.accounts[id];
    const records = RecordSelectors.records(state, account.id);
    const lastRecord = records?.[records.length - 1];
    return {
      accountId: account.id,
      balance: lastRecord?.balance,
      dateOfLastTransaction: lastRecord ? formatDateFull(lastRecord.date) : undefined,
      iconName: accountTypeIconNames[account.accountType],
      name: account.name,
    };
  });

  return { accounts };
}

export const AccountSummariesContainer = connect(mapStateToProps)(AccountSummaries);
