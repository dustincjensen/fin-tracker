import { connect } from 'react-redux';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { formatDate } from '../../../utils/date.utils';
import { AccountBalanceLineChart } from './account-balance-line-chart.component';
import { IAccountBalanceLineChartProps } from './account-balance-line-chart.props.interface';

type StateProps = Pick<IAccountBalanceLineChartProps, 'records'>;
type OwnProps = Pick<IAccountBalanceLineChartProps, 'accountId' | 'date'>;

const mapStateToProps = (state: IStore, { accountId, date }: OwnProps): StateProps => {
  const records = RecordSelectors.recordsByDate(state, accountId, date);
  return {
    records: records?.map(r => ({ ...r, date: formatDate(r.date) })),
  };
};

export const AccountMonthlyBalanceChartContainer = connect(mapStateToProps)(AccountBalanceLineChart);
