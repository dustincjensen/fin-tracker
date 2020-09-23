import { Dialog } from 'evergreen-ui';
import * as React from 'react';
import { IDeleteAccountProps } from './delete-account.props.interface';

export const DeleteAccountDialog = ({ account, onClose, onConfirm, deleteAccount }: IDeleteAccountProps) => {
  if (!account) {
    return null;
  }

  const confirm = () => {
    deleteAccount(account);
    onConfirm();
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
