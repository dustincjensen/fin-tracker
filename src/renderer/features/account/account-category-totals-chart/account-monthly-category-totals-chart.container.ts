import { connect } from 'react-redux';
import { CategorySelectors } from '../../../store/category/category.selectors';
import { IRecord } from '../../../store/record/record.interface';
import { IStore } from '../../../store/store.interface';
import { AccountCategoryTotalsChart } from './account-category-totals-chart.component';

interface IAccountMonthlyOwnProps {
  accountId: string;
  date: string;
  stateSelector: (state: IStore, accountId: string, date: string) => IRecord[];
}

const mapStateToProps = (state: IStore, ownProps: IAccountMonthlyOwnProps) => {
  const records = ownProps.stateSelector(state, ownProps.accountId, ownProps.date);
  const categories = CategorySelectors.selectCategories(state);
  return {
    records,
    categories,
  };
};

export const AccountMonthlyCategoryTotalsChartContainer = connect(mapStateToProps)(AccountCategoryTotalsChart);
