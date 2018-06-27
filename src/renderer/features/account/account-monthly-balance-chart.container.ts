import { connect } from 'react-redux';
import { IStore } from '../../store/store.interface';
import { IRecord } from '../../store/records/record.interface';
import { AccountBalanceLineChart } from './account-balance-line-chart.component';
import { formatDate } from '../../utils/date.util';

interface IAccountMonthlyOwnProps {
  accountId: string;
  date: string;
  stateSelector: (state: IStore, accountId: string, date: string) => IRecord[];
}

const mapStateToProps = (state: IStore, ownProps: IAccountMonthlyOwnProps) => {
  return {
    records: ownProps.stateSelector(state, ownProps.accountId, ownProps.date)
      .map(r => ({ ...r, date: formatDate(r.date) }))
  };
};

export const AccountMonthlyBalanceChartContainer = connect(mapStateToProps)(AccountBalanceLineChart);
