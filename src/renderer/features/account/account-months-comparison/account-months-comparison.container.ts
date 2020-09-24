import { connect } from 'react-redux';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { AccountMonthsComparison } from './account-months-comparison.component';
import { IAccountMonthsComparisonStateProps } from './account-months-comparison.component.interface';

interface IAccountMonthsComparisonOwnProps {
  accountId: string;
  date: string;
}

const mapStateToProps = (
  state: IStore,
  ownProps: IAccountMonthsComparisonOwnProps
): IAccountMonthsComparisonStateProps => {
  const { accountId, date } = ownProps;
  const previousMonthEndBalance = RecordSelectors.previousMonthEndBalance(state, accountId, date);
  const currentMonthEndBalance = RecordSelectors.currentMonthEndBalance(state, accountId, date);
  return {
    previousMonthEndBalance: `${(previousMonthEndBalance && previousMonthEndBalance.toFixed(2)) || ''}`,
    currentMonthEndBalance: `${(currentMonthEndBalance && currentMonthEndBalance.toFixed(2)) || ''}`,
  };
};

export const AccountMonthsComparisonContainer = connect(mapStateToProps)(AccountMonthsComparison);
