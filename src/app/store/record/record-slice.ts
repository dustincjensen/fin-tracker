import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MergeRecordsReturnType } from '../../models/_worker-return.type';
import { Account } from '../../models/account.type';
import { AutoCategory } from '../../models/auto-category.type';
import { Record } from '../../models/record.type';
import { SplitRecord } from '../../models/split-record.type';
import { deleteAccount } from '../account/account-slice';
import { deleteAutoCategory } from '../auto-category/auto-category-slice';

export type RecordStore = {
    /**
     * Records keyed by the account they belong to.
     */
    // TODO Record instead... but then fix type names.
    records: { [accountId: string]: Record[] };
};

const initialState: RecordStore = { records: {} };

export const recordSlice = createSlice({
    name: 'records',
    initialState,
    reducers: {
        saveNewRecords: (state, { payload }: PayloadAction<MergeRecordsReturnType>) => {
            const { records } = payload;

            if (records && records.length > 0) {
                const accountId = records[0]?.accountId;
                state.records[accountId] = records;
            }
        },
        setDetails: (state, { payload }: PayloadAction<{ accountId: string; recordId: string; details: string }>) => {
            const { accountId, recordId, details } = payload;
            const record = state.records[accountId].find(record => record.id === recordId);
            if (record) {
                record.details = details;
            }
        },
        setRecordCategory: (
            state,
            { payload }: PayloadAction<{ accountId: string; recordId: string; categoryId: string }>
        ) => {
            const { accountId, recordId, categoryId } = payload;
            const record = state.records[accountId].find(record => record.id === recordId);
            if (record) {
                record.categoryId = categoryId;
                record.autoCategoryId = undefined;
            }
        },
        // Sets the category automatically for records based on the matching description.
        setRecordsAutoCategory: (
            state,
            {
                payload,
            }: PayloadAction<{
                autoCategoryId: string;
                accountId: string;
                categoryId: string;
                description: string;
                overwriteExisting: boolean;
            }>
        ) => {
            const { autoCategoryId, accountId, categoryId, description, overwriteExisting } = payload;

            const recordsThatMatchDescription = state.records[accountId].filter(
                r =>
                    !r.splitRecords &&
                    (!r.categoryId || (r.categoryId && r.autoCategoryId) || overwriteExisting) &&
                    r.description.startsWith(description)
            );

            for (const matchedRecord of recordsThatMatchDescription) {
                matchedRecord.autoCategoryId = autoCategoryId;
                matchedRecord.categoryId = categoryId;
            }
        },
        setSplitRecordCategory: (
            state,
            {
                payload,
            }: PayloadAction<{ accountId: string; recordId: string; splitRecordId: string; categoryId: string }>
        ) => {
            const { accountId, recordId, splitRecordId, categoryId } = payload;
            const record = state.records[accountId].find(record => record.id === recordId);
            const splitRecord = record?.splitRecords?.find(sr => sr.id === splitRecordId);
            if (splitRecord) {
                splitRecord.categoryId = categoryId;
            }
        },
        setSplitRecords: (
            state,
            { payload }: PayloadAction<{ accountId: string; recordId: string; splitRecords: SplitRecord[] }>
        ) => {
            const { accountId, recordId, splitRecords } = payload;
            const record = state.records[accountId].find(record => record.id === recordId);
            if (record) {
                record.categoryId = undefined;
                record.splitRecords = splitRecords;
            }
        },
        deleteSplitRecords: (state, { payload }: PayloadAction<{ accountId: string; recordId: string }>) => {
            const { accountId, recordId } = payload;
            const record = state.records[accountId].find(record => record.id === recordId);
            if (record) {
                delete record.splitRecords;
            }
        },
    },
    extraReducers: builder => {
        // Remove all records when deleting the account.
        builder.addCase(deleteAccount, (state, { payload: account }: PayloadAction<Account>) => {
            delete state.records[account.id];
        });

        // Remove the auto category from relevant records when the auto category is deleted.
        builder.addCase(deleteAutoCategory, (state, { payload: autoCategory }: PayloadAction<AutoCategory>) => {
            const { accountId, id } = autoCategory;
            const records = state.records[accountId];
            for (const record of records) {
                if (record.autoCategoryId === id) {
                    record.autoCategoryId = undefined;
                    record.categoryId = undefined;
                }
            }
        });
    },
});

export const {
    saveNewRecords,
    setDetails,
    setRecordCategory,
    setRecordsAutoCategory,
    setSplitRecordCategory,
    setSplitRecords,
    deleteSplitRecords,
} = recordSlice.actions;

export const recordReducer = recordSlice.reducer;
