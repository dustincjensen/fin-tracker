import { connect, Dispatch } from "react-redux";
import { ActionPendingRecords, IActionPendingRecordsDispatchProps, IActionPendingRecordsStateProps } from "./action-pending-records.component";
import { ClearUploadedRecords } from '../../store/pending-records/pending-records.actions';
import { PendingRecordsMerged } from '../../store/records/records.actions';
import { IStore } from '../../store/store.interface';
import { IRecord } from "../../store/records/record.interface";
import { ByAccountId } from "../../store/records/records.selectors";

function mapStateToProps(store: IStore): IActionPendingRecordsStateProps {
    const { accountId, records } = store.pendingRecords;
    const account = store.accounts[accountId];
    return {
        startingBalance: account.startingBalance,
        newRecords: records,
        existingRecords: ByAccountId(store, accountId)
    };
}

function mapDispatchToProps(dispatch: Dispatch): IActionPendingRecordsDispatchProps {
    return {
        accept: (startingBalance: number, newRecords: IRecord[], existingRecords: IRecord[]) => {
            PendingRecordsMerged(dispatch, startingBalance, newRecords, existingRecords);
        },
        clear: () => dispatch(ClearUploadedRecords())
    };
}

export const ActionPendingRecordsContainer = connect(mapStateToProps, mapDispatchToProps)(ActionPendingRecords);