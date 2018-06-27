import { connect } from 'react-redux';
import { IStore } from '../../store/store.interface';
import { IRecord } from '../../store/records/record.interface';
import { Table } from '../../components/table/table.component';
import { ITableStateProps } from '../../components/table/table.interface';
import { formatDate } from '../../utils/date.util';

interface IAccountRecord {
  id: string;
  accountId: string;
  date: string;
  description: string;
  debit: string;
  credit: string;
  balance: string;
}

interface IAccountMonthlyOwnProps {
  accountId: string;
  date: string;
  stateSelector: (state: IStore, accountId: string, date: string) => IRecord[];
}

const mapStateToProps = (state: IStore, ownProps: IAccountMonthlyOwnProps): ITableStateProps<IAccountRecord> => {
  const data: IAccountRecord[] = ownProps.stateSelector(state, ownProps.accountId, ownProps.date)
    .map(r => {
      return {
        ...r,
        date: formatDate(r.date),
        debit: `${r.debit && r.debit.toFixed(2) || ''}`,
        credit: `${r.credit && r.credit.toFixed(2) || ''}`,
        balance: `${r.balance && r.balance.toFixed(2) || ''}`
      };
    });

  return {
    tableHeader: [
      { description: 'Date', gridWidth: 'minmax(100px, auto)' },
      { description: 'Description', gridWidth: 'minmax(100px, 2fr)' },
      { description: 'Debit', gridWidth: 'minmax(100px, auto)' },
      { description: 'Credit', gridWidth: 'minmax(100px, auto)' },
      { description: 'Balance', gridWidth: 'minmax(100px, auto)' }
    ],
    dataKeys: [
      'date', 'description', 'debit', 'credit', 'balance'
    ],
    rowData: data
  }
};

export const AccountMonthlyContainer = connect<ITableStateProps<IAccountRecord>, {}, IAccountMonthlyOwnProps>(mapStateToProps)
  (Table as new (props: ITableStateProps<IAccountRecord>) => Table<IAccountRecord>);
