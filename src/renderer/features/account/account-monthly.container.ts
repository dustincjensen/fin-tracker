import { connect } from 'react-redux';
import { IStore } from '../../store/store.interface';
import { formatDate } from '../../utils/date.util';
import { AccountMonthly } from './account-monthly.component';
import { IAccountMonthlyOwnProps, IAccountMonthlyStateProps } from './account-monthly.props.interface';
import { IAccountMonthlyRecord } from './account-monthly-record.interface';

const mapStateToProps = (state: IStore, ownProps: IAccountMonthlyOwnProps): IAccountMonthlyStateProps => {
  const data: IAccountMonthlyRecord[] = ownProps
    .stateSelector(state, ownProps.accountId, ownProps.date)
    .map(r => ({
      ...r,
      date: formatDate(r.date),
      debit: `${r.debit && r.debit.toFixed(2) || ''}`,
      credit: `${r.credit && r.credit.toFixed(2) || ''}`,
      balance: `${r.balance && r.balance.toFixed(2) || ''}`
    }));

  return {
    records: data
  }
};

export const AccountMonthlyContainer = connect(mapStateToProps)(AccountMonthly);
