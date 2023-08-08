import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from '@reduxjs/toolkit/node_modules/immer/dist/internal';
import { ImportErrorReturnType, ImportRecordsReturnType } from '../../models/_worker-return.type';
import { Record } from '../../models/record.type';
import { saveNewRecords } from '../record/record-slice';

export type PendingRecordStore = {
    /**
     * The ID of the account to add the records to.
     */
    accountId: string;

    /**
     * The file path of the imported file.
     */
    filePath: string;

    /**
     * The file name of the imported file.
     */
    fileName: string;

    /**
     * Pending records to be uploaded.
     */
    records: Record[];

    /**
     * If the import had an error, the text of the error.
     */
    error: string;
};

const initialState: PendingRecordStore = {
    accountId: undefined,
    filePath: undefined,
    fileName: undefined,
    records: [],
    error: undefined,
};

const clearImportedRecordsHandler = (state: WritableDraft<PendingRecordStore>) => {
    state.accountId = undefined;
    state.filePath = undefined;
    state.fileName = undefined;
    state.records = [];
    state.error = undefined;
};

export const pendingRecordSlice = createSlice({
    name: 'pendingRecords',
    initialState,
    reducers: {
        importNewRecords: (state, { payload }: PayloadAction<ImportRecordsReturnType>) => {
            const { records, accountId, filePath, fileName } = payload;

            state.error = undefined;

            if (records && records.length > 0) {
                state.accountId = accountId;
                state.filePath = filePath;
                state.fileName = fileName;
                state.records = records;
            } else {
                state.accountId = undefined;
                state.filePath = undefined;
                // TODO why don't we clear file name here?
                state.records = [];
            }
        },
        importError: (state, { payload }: PayloadAction<ImportErrorReturnType>) => {
            const { error, fileName, filePath } = payload;
            state.error = error;
            state.fileName = fileName;
            state.filePath = filePath;
        },
        clearError: state => {
            state.error = undefined;
        },
        clearImportedRecords: clearImportedRecordsHandler,
        updatePendingRecordCategory: (state, { payload }: PayloadAction<{ recordId: string; categoryId: string }>) => {
            const { recordId, categoryId } = payload;
            const record = state.records.find(r => r.id === recordId);
            if (record) {
                record.categoryId = categoryId;
                record.autoCategoryId = undefined;
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(saveNewRecords, clearImportedRecordsHandler);
    },
});

export const { importNewRecords, importError, clearError, clearImportedRecords, updatePendingRecordCategory } =
    pendingRecordSlice.actions;

export const pendingRecordReducer = pendingRecordSlice.reducer;
