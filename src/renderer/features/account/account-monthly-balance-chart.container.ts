import { connect } from 'react-redux';
import { IRecord } from '../../store/records/record.interface';
import { IStore } from '../../store/store.interface';
import { formatDate } from '../../utils/date.util';
import { AccountBalanceLineChart } from './account-balance-line-chart.component';

interface IAccountMonthlyOwnProps {
  accountId: string;
  date: string;
  stateSelector: (state: IStore, accountId: string, date: string) => IRecord[];
}

const mapStateToProps = (state: IStore, ownProps: IAccountMonthlyOwnProps) => {
  return {
    records: ownProps
      .stateSelector(state, ownProps.accountId, ownProps.date)
      .map(r => ({ ...r, date: formatDate(r.date) })),
  };
};

export const AccountMonthlyBalanceChartContainer = connect(mapStateToProps)(AccountBalanceLineChart);
