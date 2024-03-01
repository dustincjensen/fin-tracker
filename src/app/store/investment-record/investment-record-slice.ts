import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../../models/account.type';
import { InvestmentRecord } from '../../models/investment-record.type';
import { deleteAccount } from '../account/account-slice';

export type InvestmentRecordStore = {
    /**
     * Records keyed by the account they belong to.
     */
    records: Record<string, InvestmentRecord[]>;
};

const initialState: InvestmentRecordStore = { records: {} };

export const investmentRecordSlice = createSlice({
    name: 'investmentRecords',
    initialState,
    reducers: {
        addRecord: (state, { payload: record }: PayloadAction<InvestmentRecord>) => {
            const { accountId } = record;
            if (!state.records[accountId]) {
                state.records[accountId] = [];
            }
            state.records[accountId].push(record);
        },
        deleteRecord: (state, { payload: record }: PayloadAction<InvestmentRecord>) => {
            const { accountId } = record;
            state.records[accountId] = state.records[accountId].filter(r => r.id !== record.id);
        },
    },
    extraReducers: builder => {
        builder.addCase(deleteAccount, (state, { payload: account }: PayloadAction<Account>) => {
            delete state.records[account.id];
        });
    },
});

export const { addRecord, deleteRecord } = investmentRecordSlice.actions;

export const investmentRecordReducer = investmentRecordSlice.reducer;
