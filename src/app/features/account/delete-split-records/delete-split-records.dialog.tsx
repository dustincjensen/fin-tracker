import { Dialog } from 'evergreen-ui';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSplitRecords } from '../../../store/record/record-slice';
import { IDeleteSplitRecordsProps } from './delete-split-records.props.interface';

const DeleteSplitRecordsDialogComponent = ({ record, onClose }: IDeleteSplitRecordsProps) => {
    const dispatch = useDispatch();

    if (!record) {
        return null;
    }

    const confirm = () => {
        dispatch(deleteSplitRecords({ accountId: record.accountId, recordId: record.id }));
        onClose();
    };

    return (
        <Dialog
            isShown={true}
            onCloseComplete={onClose}
            preventBodyScrolling
            intent='danger'
            confirmLabel='Delete'
            title='Delete Split Transactions?'
            onConfirm={confirm}
        >
            Are you sure you want to delete the split transactions for this transaction?
        </Dialog>
    );
};

export const DeleteSplitRecordsDialog = React.memo(DeleteSplitRecordsDialogComponent);
