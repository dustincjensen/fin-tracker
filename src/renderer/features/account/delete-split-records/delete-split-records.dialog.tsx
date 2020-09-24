import { Dialog } from 'evergreen-ui';
import * as React from 'react';
import { IDeleteSplitRecordsProps } from './delete-split-records.props.interface';

export const DeleteSplitRecordsDialog = ({
  record,
  onClose,
  onConfirm,
  deleteRecordSplitRecords,
}: IDeleteSplitRecordsProps) => {
  if (!record) {
    return null;
  }

  const confirm = () => {
    deleteRecordSplitRecords(record);
    onConfirm();
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
