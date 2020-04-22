import { connect } from 'react-redux';
import { PendingRecordSelectors } from '../../store/pending-record/pending-record.selectors';
import { IStore } from '../../store/store.interface';
import { ImportLayout } from './import.layout';
import { IImportLayoutStateProps } from './import.props.interface';

function mapStateToProps(state: IStore): IImportLayoutStateProps {
  return {
    hasPendingRecords: PendingRecordSelectors.pendingRecords(state).accountId != undefined,
  };
}

export const ImportContainer = connect(mapStateToProps)(ImportLayout);
