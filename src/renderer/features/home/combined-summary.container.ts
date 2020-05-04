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
  allYearsBetweenDates,
  isInYear,
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

const displayMonthDates = createSelector(AccountSelectors.accounts, RecordSelectors.records, (accounts, records) => {
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

const displayYearDates = createSelector(AccountSelectors.accounts, RecordSelectors.records, (accounts, records) => {
  const startingDates = Object.keys(accounts).map(id => {
    const { startYear } = accounts[id];
    return `${startYear}-12-01`;
  });

  const endDates = Object.keys(accounts).map(id => {
    const accountRecords = records[id];
    return accountRecords?.[accountRecords.length - 1].date;
  });

  return allYearsBetweenDates(getEarliestDate(startingDates), getLatestDate(endDates));
});

const selectAccountBalances = (query: (date: string, date2: string) => boolean, dateSelector) =>
  createSelector(selectAccounts, RecordSelectors.records, dateSelector, (accounts, records, dates: string[]) => {
    const endAccountBalancesByDate = [];
    for (let index = 0; index < dates.length; index++) {
      const date = dates[index];
      const accountBalances = {};
      let total = 0.0;
      for (const account of accounts) {
        const { accountId } = account;
        let balance = records[accountId]?.filter(r => query(r.date, date)).pop()?.balance;

        if (isNullOrUndefined(balance) && index > 0) {
          balance = endAccountBalancesByDate[index - 1].accountBalances[accountId];
        }

        accountBalances[accountId] = isNullOrUndefined(balance) ? undefined : balance;
        total += balance || 0.0;
      }
      endAccountBalancesByDate.push({ date, accountBalances, total: total || undefined });
    }
    return endAccountBalancesByDate;
  });

const selectMonthBalances = selectAccountBalances((date1, date2) => isInYearMonth(date1, date2), displayMonthDates);
const selectYearBalances = selectAccountBalances((date1, date2) => isInYear(date1, `${date2}-01-01`), displayYearDates);

function mapStateToProps(state: IStore): ICombinedSummaryStateProps {
  const selectedAccounts = selectAccounts(state);
  const endMonthBalances = selectMonthBalances(state);
  const endYearBalances = selectYearBalances(state);

  return {
    accounts: selectedAccounts,
    endMonthBalances,
    endYearBalances,
  };
}

export const CombinedSummaryContainer = connect(mapStateToProps)(CombinedSummary);
