import { connect } from 'react-redux';
import { IStore } from '../../store/store.interface';
import { PendingRecords } from './pending-records.component';
import { IPendingRecordsStateProps } from './pending-records.props.interface';

const mapStateToProps = (state: IStore): IPendingRecordsStateProps => {
    return {
        records: state.pendingRecords.records
    }
};

export const PendingRecordsContainer = connect(mapStateToProps)(PendingRecords);
