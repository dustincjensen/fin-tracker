import * as React from 'react';
import { connect } from 'react-redux';
import IStore from '../store/store.interface';
import IRecord from '../store/records/record.interface';
import { Table } from '../components/table/table.component';
import { ITableStateProps } from '../components/table/table.props';
import { SSL_OP_CISCO_ANYCONNECT } from 'constants';

interface INewImportRecordTableOwnProps {
  stateSelector: (state: IStore) => IRecord[];
}

const mapStateToProps = (state: IStore, ownProps: INewImportRecordTableOwnProps): ITableStateProps<IRecord> => {
  return {
    tableHeader: [
      { description: '', gridWidth: 'auto' },
      { description: 'Date', gridWidth: 'minmax(100px, auto)' },
      { description: 'Description', gridWidth: 'minmax(100px, 2fr)' },
      { description: 'Debit', gridWidth: 'minmax(100px, auto)' },
      { description: 'Credit', gridWidth: 'minmax(100px, auto)' }
    ],
    dataKeys: [
      'rowNumber', 'date', 'description', 'debit', 'credit'
    ],
    rowData: ownProps.stateSelector(state)
  }
};

export default connect<ITableStateProps<IRecord>, {}, INewImportRecordTableOwnProps>(mapStateToProps)
  (Table as new (props: ITableStateProps<IRecord>) => Table<IRecord>);
