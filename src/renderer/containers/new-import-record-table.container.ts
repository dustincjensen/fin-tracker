import * as React from 'react';
import { connect } from 'react-redux';
import IStore from '../store/store.interface';
import { Record } from '../store/new-file/new-file.interface';
import RecordTable from '../components/record-table/record-table.component';
import RecordTableProps from '../components/record-table/record-table.props';

interface INewImportRecordTableOwnProps {
  stateSelector: (state: IStore) => Record[];
}

const mapStateToProps = (state: IStore, ownProps: INewImportRecordTableOwnProps): RecordTableProps => {
  return {
    records: ownProps.stateSelector(state)
  }
};

export default connect(mapStateToProps, null)(RecordTable);
