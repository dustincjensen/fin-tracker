import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../../models/account.type';

export type AccountStore = {
    /**
     * The accounts belonging to a user.
     */
    accounts: { [id: string]: Account };
};

const initialState: AccountStore = { accounts: {} };

export const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        saveNewAccount: (state, { payload: newAccount }: PayloadAction<Account>) => {
            state.accounts[newAccount.id] = newAccount;
        },
        updateAccount: (state, { payload: updatedAccount }: PayloadAction<Account>) => {
            const { id } = updatedAccount;
            if (!state.accounts[id]) {
                throw Error('Account does not exist.');
            }
            state.accounts[id] = updatedAccount;
        },
        deleteAccount: (state, { payload: deletedAccount }: PayloadAction<Account>) => {
            delete state.accounts[deletedAccount.id];
        },
        archiveAccount: (
            state,
            { payload }: PayloadAction<{ id: string; archived: boolean; endYear: number; endMonth: number }>
        ) => {
            const { id, archived, endYear, endMonth } = payload;
            const account = state.accounts[id];
            account.archived = archived;
            account.endYear = endYear;
            account.endMonth = endMonth;
        },
    },
});

export const { saveNewAccount, updateAccount, deleteAccount, archiveAccount } = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
