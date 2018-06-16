import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../store/store.interface';
import { IRecord } from '../store/records/record.interface';
import { Table } from '../components/table/table.component';
import { ITableStateProps } from '../components/table/table.interface';

interface IAccountMonthlyOwnProps {
  accountId: string;
  date: string;
  stateSelector: (state: IStore, accountId: string, date: string) => IRecord[];
}

const mapStateToProps = (state: IStore, ownProps: IAccountMonthlyOwnProps): ITableStateProps<IRecord> => {
  return {
    tableHeader: [
      { description: 'Date', gridWidth: 'minmax(100px, auto)' },
      { description: 'Description', gridWidth: 'minmax(100px, 2fr)' },
      { description: 'Debit', gridWidth: 'minmax(100px, auto)' },
      { description: 'Credit', gridWidth: 'minmax(100px, auto)' }
    ],
    dataKeys: [
      'date', 'description', 'debit', 'credit'
    ],
    rowData: ownProps.stateSelector(state, ownProps.accountId, ownProps.date)
  }
};

export const AccountMonthlyContainer = connect<ITableStateProps<IRecord>, {}, IAccountMonthlyOwnProps>(mapStateToProps)
  (Table as new (props: ITableStateProps<IRecord>) => Table<IRecord>);
