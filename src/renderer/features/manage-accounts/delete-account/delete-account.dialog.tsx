import { Dialog } from 'evergreen-ui';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AccountActions } from '../../../store/account/account.actions';
import { IDeleteAccountProps } from './delete-account.props.interface';

export const DeleteAccountDialog = ({ account, onClose }: IDeleteAccountProps) => {
  const dispatch = useDispatch();

  if (!account) {
    return null;
  }

  const confirm = () => {
    dispatch(AccountActions.deleteAccount(account));
    onClose();
  };

  return (
    <Dialog
      isShown={true}
      onCloseComplete={onClose}
      preventBodyScrolling
      intent='danger'
      confirmLabel='Delete'
      title='Delete Account?'
      onConfirm={confirm}
    >
      Are you sure you want to delete the <b>&quot;{account.name}&quot;</b> account? All associated records will also be
      deleted.
    </Dialog>
  );
};
