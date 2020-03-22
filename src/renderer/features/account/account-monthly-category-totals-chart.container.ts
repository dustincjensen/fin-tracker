import { connect } from 'react-redux';
import { IRecord } from '../../store/record/record.interface';
import { IStore } from '../../store/store.interface';
import { AccountCategoryTotalsChart } from './account-category-totals-chart.component';

interface IAccountMonthlyOwnProps {
  accountId: string;
  date: string;
  stateSelector: (state: IStore, accountId: string, date: string) => IRecord[];
}

const mapStateToProps = (state: IStore, ownProps: IAccountMonthlyOwnProps) => {
  const records = ownProps.stateSelector(state, ownProps.accountId, ownProps.date);
  const categories = Object.keys(state.categories.categories)
    ?.map(id => state.categories.categories[id])
    .sort((c1, c2) => {
      return c1.name < c2.name ? -1 : c1.name > c2.name ? 1 : 0;
    });
  return {
    records,
    categories,
  };
};

export const AccountMonthlyCategoryTotalsChartContainer = connect(mapStateToProps)(AccountCategoryTotalsChart);
