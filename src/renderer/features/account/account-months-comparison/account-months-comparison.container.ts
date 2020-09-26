import { connect } from 'react-redux';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { AccountMonthsComparison } from './account-months-comparison.component';
import { IAccountMonthsComparisonProps } from './account-months-comparison.props.interface';

type StateProps = Pick<IAccountMonthsComparisonProps, 'previousMonthEndBalance' | 'currentMonthEndBalance'>;
type OwnProps = Pick<IAccountMonthsComparisonProps, 'accountId' | 'date'>;

const mapStateToProps = (state: IStore, { accountId, date }: OwnProps): StateProps => {
  const previousMonthEndBalance = RecordSelectors.previousMonthEndBalance(state, accountId, date);
  const currentMonthEndBalance = RecordSelectors.currentMonthEndBalance(state, accountId, date);
  return {
    previousMonthEndBalance: `${(previousMonthEndBalance && previousMonthEndBalance.toFixed(2)) || ''}`,
    currentMonthEndBalance: `${(currentMonthEndBalance && currentMonthEndBalance.toFixed(2)) || ''}`,
  };
};

export const AccountMonthsComparisonContainer = connect(mapStateToProps)(AccountMonthsComparison);
