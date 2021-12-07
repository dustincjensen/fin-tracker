import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { AutoCategorySelectors } from '../../../store/auto-category/auto-category.selectors';
import { CategorySelectors } from '../../../store/category/category.selectors';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { DateCurriedQuery, displayMonthDates, queryByIsInYearAndMonth } from '../combined.utils';
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

const categorySummarySelector = (query: DateCurriedQuery, dateSelector) =>
  createSelector(
    selectAccounts,
    RecordSelectors.records,
    AutoCategorySelectors.autoCategories,
    dateSelector,
    (accounts, records, autoCategories, dates: string[]) => {
      const categoryBalancesByDate = [];

      for (let index = 0; index < dates.length; index++) {
        const date = dates[index];
        const categoryBalances = {};

        // Only need to create this date once for each check against the accounts records.
        const curriedQuery = query(date);

        for (const account of accounts) {
          const { accountId } = account;
          const accountsRecordsForDateRange = records[accountId]?.filter(r => curriedQuery(r.date));
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

            // TODO bug where split records are not in balance for this chart.
            // const splits = record.splitRecords;
            // if (splits?.some(s => s.categoryId)) {
            //     Add to category balances
            // }

            /*
            Fun Jul 2018
            745.7
            212.49 -> actual 272.49 // FIX
            52.49
            77.44
            2581.41
            964.66

            Car Jun 2019
            479.37 -> actual 671.27 // FIX
            */
          }
        }
        categoryBalancesByDate.push({ date, categoryBalances: categoryBalances });
      }

      return categoryBalancesByDate;
    }
  );

const selectCategoryTotalsByMonth = categorySummarySelector(queryByIsInYearAndMonth, displayMonthDates);

const mapStateToProps = (state: IStore): StateProps => {
  return {
    categories: CategorySelectors.selectDisplayCategories(state),
    categoryTotalsByMonth: selectCategoryTotalsByMonth(state),
  };
};

export const CombinedCategorySummaryContainer = connect(mapStateToProps)(CombinedCategorySummary);
