import { Dialog } from 'evergreen-ui';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { InvestmentRecordActions } from '../../../store/investment-record/investment-record.actions';
import { IDeleteInvestmentRecordProps } from './delete-investment-record.props.interface';

const DeleteInvestmentRecordDialogComponent = ({ record, onClose }: IDeleteInvestmentRecordProps) => {
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
