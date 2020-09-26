import { connect } from 'react-redux';
import { CategorySelectors } from '../../../store/category/category.selectors';
import { IStore } from '../../../store/store.interface';
import { AccountCategoryTotalsChart } from './account-category-totals-chart.component';
import { IAccountCategoryTotalsChartProps } from './account-category-totals-chart.props.interface';

type StateProps = Pick<IAccountCategoryTotalsChartProps, 'records' | 'categories'>;
type OwnProps = Pick<IAccountCategoryTotalsChartProps, 'stateSelector' | 'accountId' | 'date'>;

const mapStateToProps = (state: IStore, { stateSelector, accountId, date }: OwnProps): StateProps => {
  return {
    records: stateSelector(state, accountId, date),
    categories: CategorySelectors.selectCategories(state),
  };
};

export const AccountMonthlyCategoryTotalsChartContainer = connect(mapStateToProps)(AccountCategoryTotalsChart);
