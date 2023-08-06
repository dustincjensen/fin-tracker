import { Dialog } from 'evergreen-ui';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Account } from '../../models/account.type';
import { deleteAccount } from '../../store/account/account-slice';

type DeleteAccountProps = {
    /**
     * The account to delete.
     */
    account: Account;

    /**
     * Action to call when the modal closes.
     */
    onClose: () => void;
};

export const DeleteAccountDialog = ({ account, onClose }: DeleteAccountProps) => {
    const dispatch = useDispatch();

    if (!account) {
        return null;
    }

    const confirm = () => {
        dispatch(deleteAccount(account));
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
            Are you sure you want to delete the <b>&quot;{account.name}&quot;</b> account? All associated records will
            also be deleted.
        </Dialog>
    );
};
