import * as React from 'react';
import { connect } from 'react-redux';
import IStore from '../store/store.interface';
import RecordTable from '../components/record-table/record-table.component';
import RecordTableProps from '../components/record-table/record-table.props';

const mapStateToProps = (state: IStore): RecordTableProps => {
  return {
    records: state.newFile.records
  }
};

export default connect(mapStateToProps, null)(RecordTable);
