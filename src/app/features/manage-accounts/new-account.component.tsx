import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Account } from '../../models/account.type';
import { saveNewAccount } from '../../store/account/account-slice';
import { EditAccount } from './edit-account.component';

export const NewAccount = () => {
    const dispatch = useDispatch();
    const onSave = useCallback((account: Account) => dispatch(saveNewAccount(account)), [dispatch]);

    return (
        <EditAccount
            headerText='New Account'
            saveButtonText='Save Account'
            canEditComplexFields
            isNew
            saveAccount={onSave}
        />
    );
};
