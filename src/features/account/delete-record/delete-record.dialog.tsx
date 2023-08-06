import { Dialog } from 'evergreen-ui';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useBackgroundWorkerContext } from '../../../background-worker-provider.component';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { IDeleteRecordProps } from './delete-record.props.interface';

const DeleteRecordDialogComponent = ({ record, onClose }: IDeleteRecordProps) => {
  const account = useSelector((state: IStore) => AccountSelectors.account(state, record?.accountId), shallowEqual);
  const existingRecords = useSelector(
    (state: IStore) => RecordSelectors.recordsByAccountId(state, record?.accountId),
    shallowEqual
  );
  const worker = useBackgroundWorkerContext();

  if (!record) {
    return null;
  }

  const confirm = () => {
    // Since we have to update the balances when removing a record,
    // instead of first deleting from the store, then getting the new list
    // then sending that for balance updating, we just send the entire list
    // without the record we don't want anymore, and it recalculates the balance
    // for us without the record.
    const index = existingRecords.findIndex(r => r.id === record.id);
    if (index >= 0) {
      const existingRecordsCopy = [...existingRecords];
      existingRecordsCopy.splice(index, 1);
      worker.invokeBackgroundTask?.('NEW_RECORDS_MERGED', [account.startingBalance, [], existingRecordsCopy]);
      onClose();
    } else {
      throw new Error('The record that is being deleted does not exist.');
    }
  };

  return (
    <Dialog
      isShown={true}
      onCloseComplete={onClose}
      preventBodyScrolling
      intent='danger'
      confirmLabel='Delete'
      title='Delete Manual Transaction?'
      onConfirm={confirm}
    >
      Are you sure you want to delete this manually entered transaction?
    </Dialog>
  );
};

export const DeleteRecordDialog = React.memo(DeleteRecordDialogComponent);
