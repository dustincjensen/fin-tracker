import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { AccountSelectors } from '../../store/account/account.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import {
  allMonthsBetweenDates,
  getEarliestDate,
  getLatestDate,
  isInYearMonth,
  getPreviousMonth,
} from '../../utils/date.util';
import { isNullOrUndefined } from '../../utils/object.utils';
import { CombinedSummary } from './combined-summary.component';
import { ICombinedSummaryStateProps } from './combined-summary.props.interface';

const selectAccounts = createSelector(AccountSelectors.accounts, (accounts): ICombinedSummaryStateProps['accounts'] =>
  Object.keys(accounts).map(id => {
    return {
      accountId: id,
      accountName: accounts[id].name,
    };
  })
);

const displayDates = createSelector(AccountSelectors.accounts, RecordSelectors.records, (accounts, records) => {
  const startingDates = Object.keys(accounts).map(id => {
    const { startYear, startMonth } = accounts[id];
    // TODO fix typing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return `${startYear}-${parseInt(startMonth as any) + 1}`;
  });

  const endDates = Object.keys(accounts).map(id => {
    const accountRecords = records[id];
    return accountRecords?.[accountRecords.length - 1].date;
  });

  return allMonthsBetweenDates(getEarliestDate(startingDates), getLatestDate(endDates));
});

const selectAccountEndOfMonthBalances = createSelector(
  selectAccounts,
  RecordSelectors.records,
  displayDates,
  (accounts, records, dates): ICombinedSummaryStateProps['endBalances'] => {
    const endOfMonthAccountBalancesByDate: ICombinedSummaryStateProps['endBalances'] = [];
    for (const date of dates) {
      const accountBalances = {};
      let total = 0.0;
      for (const account of accounts) {
        const { accountId } = account;
        let balance = records[accountId]?.filter(r => isInYearMonth(r.date, date)).pop()?.balance;

        if (isNullOrUndefined(balance)) {
          const previousMonth = getPreviousMonth(date);
          balance = records[accountId]?.filter(r => isInYearMonth(r.date, previousMonth))?.pop()?.balance;
        }

        accountBalances[accountId] = isNullOrUndefined(balance) ? undefined : balance;
        total += balance || 0.0;
      }
      endOfMonthAccountBalancesByDate.push({ date, accountBalances, total: total || undefined });
    }
    return endOfMonthAccountBalancesByDate;
  }
);

function mapStateToProps(state: IStore): ICombinedSummaryStateProps {
  const selectedAccounts = selectAccounts(state);
  const endBalances = selectAccountEndOfMonthBalances(state);

  return {
    accounts: selectedAccounts,
    endBalances,
  };
}

export const CombinedSummaryContainer = connect(mapStateToProps)(CombinedSummary);
