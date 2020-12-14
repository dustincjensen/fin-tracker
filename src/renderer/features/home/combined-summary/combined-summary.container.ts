import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { createDate } from '../../../utils/date.utils';
import { isNullOrUndefined } from '../../../utils/object.utils';
import {
  DateCurriedQuery,
  displayMonthDates,
  displayYearDates,
  queryByIsInYear,
  queryByIsInYearAndMonth,
} from '../combined.utils';
import { CombinedSummary } from './combined-summary.component';
import { ICombinedSummaryProps } from './combined-summary.props.interface';

type StateProps = ICombinedSummaryProps;

const selectAccountBalances = (query: DateCurriedQuery, dateSelector) =>
  createSelector(
    AccountSelectors.selectAccounts,
    RecordSelectors.records,
    dateSelector,
    (accounts, records, dates: string[]) => {
      const endAccountBalancesByDate = [];
      for (let index = 0; index < dates.length; index++) {
        const date = dates[index];
        const accountBalances = {};
        let total = 0.0;

        // Only need to create this date once for each check against the accounts records.
        const curriedQuery = query(date);
        const currentDate = createDate(date);

        for (const account of accounts) {
          const { id: accountId, archived, endYear, endMonth } = account;
          
          // Check if the account is archived and if so, get the end date.
          // If we are dealing with a date that is greater than the end date of the account
          // then we put undefined and move on. This results in a '-' instead of continuing zeroes.
          const accountEndDate = archived ? createDate(`${endYear}-${endMonth + 1}`) : undefined;
          if (accountEndDate && currentDate > accountEndDate) {
            accountBalances[accountId] = undefined;
            continue;
          }
          
          let balance = records[accountId]?.filter(r => curriedQuery(r.date)).pop()?.balance;

          // Get the balance from the previous date if the current date had no entries.
          if (isNullOrUndefined(balance) && index > 0) {
            balance = endAccountBalancesByDate[index - 1].accountBalances[accountId];
          }

          accountBalances[accountId] = isNullOrUndefined(balance) ? undefined : balance;
          total += balance || 0.0;
        }
        endAccountBalancesByDate.push({ date, accountBalances, total: total || undefined });
      }
      return endAccountBalancesByDate;
    }
  );

const selectMonthBalances = selectAccountBalances(queryByIsInYearAndMonth, displayMonthDates);
const selectYearBalances = selectAccountBalances(queryByIsInYear, displayYearDates);

const mapStateToProps = (state: IStore): StateProps => {
  return {
    accounts: AccountSelectors.selectAccountNames(state),
    endMonthBalances: selectMonthBalances(state),
    endYearBalances: selectYearBalances(state),
  };
};

export const CombinedSummaryContainer = connect(mapStateToProps)(CombinedSummary);
