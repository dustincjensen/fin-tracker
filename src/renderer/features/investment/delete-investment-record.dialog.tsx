import { Dialog } from 'evergreen-ui';
import React from 'react';
import { useDispatch } from 'react-redux';
import { InvestmentRecordActions } from '../../store/investment-record/investment-record.actions';
import { IInvestmentRecord } from '../../store/investment-record/investment-record.interface';

type DeleteInvestmentRecordProps = {
  /**
   * The record to delete.
   */
  record: IInvestmentRecord;

  /**
   * Action to call when the modal closes.
   */
  onClose: () => void;
};

const DeleteInvestmentRecordDialogComponent = ({ record, onClose }: DeleteInvestmentRecordProps) => {
  const dispatch = useDispatch();

  const confirm = () => {
    dispatch(InvestmentRecordActions.deleteRecord(record));
    onClose();
  };

  return (
    <Dialog
      isShown={true}
      onCloseComplete={onClose}
      preventBodyScrolling
      intent='danger'
      confirmLabel='Delete'
      title='Delete Balance?'
      onConfirm={confirm}
    >
      Are you sure you want to delete this balance?
    </Dialog>
  );
};

export const DeleteInvestmentRecordDialog = React.memo(DeleteInvestmentRecordDialogComponent);
