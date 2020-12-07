import { connect } from 'react-redux';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { stringToMonthYear } from '../../../utils/date.utils';
import { isNullOrUndefined } from '../../../utils/object.utils';
import { AccountMonthsComparison } from './account-months-comparison.component';
import { IAccountMonthsComparisonProps } from './account-months-comparison.props.interface';

type StateProps = Pick<
  IAccountMonthsComparisonProps,
  'accountName' | 'accountType' | 'displayDate' | 'previousMonthEndBalance' | 'currentMonthEndBalance'
>;
type OwnProps = Pick<IAccountMonthsComparisonProps, 'accountId' | 'date'>;

const mapStateToProps = (state: IStore, { accountId, date }: OwnProps): StateProps => {
  const account = AccountSelectors.account(state, accountId);
  const previousMonthEndBalance = RecordSelectors.previousMonthEndBalance(state, accountId, date);
  const currentMonthEndBalance = RecordSelectors.currentMonthEndBalance(state, accountId, date);
  return {
    accountName: account?.name,
    accountType: account?.accountType,
    displayDate: stringToMonthYear(date),
    previousMonthEndBalance: `${(!isNullOrUndefined(previousMonthEndBalance) && previousMonthEndBalance.toFixed(2)) ||
      ''}`,
    currentMonthEndBalance: `${(!isNullOrUndefined(currentMonthEndBalance) && currentMonthEndBalance.toFixed(2)) ||
      ''}`,
  };
};

export const AccountMonthsComparisonContainer = connect(mapStateToProps)(AccountMonthsComparison);
