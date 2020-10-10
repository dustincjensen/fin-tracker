import { connect } from 'react-redux';
import { IStore } from '../../../store/store.interface';
import { formatDate } from '../../../utils/date.utils';
import { AccountBalanceLineChart } from './account-balance-line-chart.component';
import { IAccountBalanceLineChartProps } from './account-balance-line-chart.props.interface';

type StateProps = Pick<IAccountBalanceLineChartProps, 'records'>;
type OwnProps = Pick<IAccountBalanceLineChartProps, 'stateSelector' | 'accountId' | 'date'>;

const mapStateToProps = (state: IStore, { stateSelector, accountId, date }: OwnProps): StateProps => {
  const records = stateSelector(state, accountId, date);
  return {
    records: records?.map(r => ({ ...r, date: formatDate(r.date) })),
  };
};

export const AccountMonthlyBalanceChartContainer = connect(mapStateToProps)(AccountBalanceLineChart);
