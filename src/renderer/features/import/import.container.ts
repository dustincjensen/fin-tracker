import { connect } from 'react-redux';
import { IStore } from '../../store/store.interface';
import { ImportLayout } from './import.layout';
import { IImportLayoutStateProps } from './import.props.interface';

function mapStateToProps(store: IStore): IImportLayoutStateProps {
  return {
    hasPendingRecords: store.pendingRecords.accountId != undefined,
  };
}

export const ImportContainer = connect(mapStateToProps)(ImportLayout);
