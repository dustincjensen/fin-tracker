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
      const c1Name = c1.name.toLowerCase();
      const c2Name = c2.name.toLowerCase();
      return c1Name < c2Name ? -1 : c1Name > c2Name ? 1 : 0;
    });
  return {
    records,
    categories,
  };
};

export const AccountMonthlyCategoryTotalsChartContainer = connect(mapStateToProps)(AccountCategoryTotalsChart);
