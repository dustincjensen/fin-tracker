import { connect } from 'react-redux';
import { CategorySelectors } from '../../../store/category/category.selectors';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { AccountCategoryTotalsChart } from './account-category-totals-chart.component';
import { IAccountCategoryTotalsChartProps } from './account-category-totals-chart.props.interface';

type StateProps = Pick<IAccountCategoryTotalsChartProps, 'records' | 'categories'>;
type OwnProps = Pick<IAccountCategoryTotalsChartProps, 'accountId' | 'date'>;

const mapStateToProps = (state: IStore, { accountId, date }: OwnProps): StateProps => {
  return {
    records: RecordSelectors.recordsByDate(state, accountId, date),
    categories: CategorySelectors.selectCategories(state),
  };
};

export const AccountMonthlyCategoryTotalsChartContainer = connect(mapStateToProps)(AccountCategoryTotalsChart);
