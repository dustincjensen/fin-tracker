import { Dialog } from 'evergreen-ui';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AccountActions } from '../../store/account/account.actions';
import { IAccount } from '../../store/account/account.interface';

type DeleteAccountProps = {
    /**
     * The account to delete.
     */
    account: IAccount;

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
            Are you sure you want to delete the <b>&quot;{account.name}&quot;</b> account? All associated records will
            also be deleted.
        </Dialog>
    );
};
