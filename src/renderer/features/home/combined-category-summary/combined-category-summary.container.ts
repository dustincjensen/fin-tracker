import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { AutoCategorySelectors } from '../../../store/auto-category/auto-category.selectors';
import { CategorySelectors } from '../../../store/category/category.selectors';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { allMonthsBetweenDates, getEarliestDate, getLatestDate, isInYearMonth } from '../../../utils/date.utils';
import { CombinedCategorySummary } from './combined-category-summary.component';
import { ICombinedCategorySummaryProps } from './combined-category-summary.props.interface';

type StateProps = ICombinedCategorySummaryProps;

const selectAccounts = createSelector(AccountSelectors.accounts, accounts =>
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

const categorySummarySelector = (query: (date: string, date2: string) => boolean, dateSelector) =>
  createSelector(
    selectAccounts,
    RecordSelectors.records,
    CategorySelectors.categories,
    AutoCategorySelectors.autoCategories,
    dateSelector,
    (accounts, records, categories, autoCategories, dates: string[]) => {
      const categoryBalancesByDate = [];

      for (let index = 0; index < dates.length; index++) {
        const date = dates[index];
        const categoryBalances = {};

        for (const account of accounts) {
          const { accountId } = account;
          const accountsRecordsForDateRange = records[accountId]?.filter(r => query(r.date, date));
          const autoCategoriesForAccount = autoCategories[accountId];

          if (!accountsRecordsForDateRange) {
            continue;
          }

          for (const record of accountsRecordsForDateRange) {
            if (record.categoryId || record.autoCategoryId) {
              const categoryId =
                record.categoryId || autoCategoriesForAccount.find(a => a.id === record.autoCategoryId).categoryId;
              const balance = (record.credit || 0) - (record.debit || 0);

              if (categoryBalances[categoryId]) {
                categoryBalances[categoryId] += balance;
              } else {
                categoryBalances[categoryId] = balance;
              }
            }
          }
        }
        categoryBalancesByDate.push({ date, categoryBalances: categoryBalances });
      }

      return categoryBalancesByDate;
    }
  );

const selectCategoryTotalsByMonth = categorySummarySelector(
  (date1, date2) => isInYearMonth(date1, date2),
  displayMonthDates
);

const mapStateToProps = (state: IStore): StateProps => {
  return {
    categories: CategorySelectors.selectCategories(state),
    categoryTotalsByMonth: selectCategoryTotalsByMonth(state),
  };
};

export const CombinedCategorySummaryContainer = connect(mapStateToProps)(CombinedCategorySummary);
