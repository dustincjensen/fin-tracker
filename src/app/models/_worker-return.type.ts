import { Record } from './record.type';

export type ImportRecordsReturnType = { records: Record[]; accountId: string; filePath: string; fileName: string };
export type ImportErrorReturnType = { error: string; filePath: string; fileName: string };
export type MergeRecordsReturnType = { records: Record[] };

export type WorkerReturnType = {
    type: 'NEW_RECORDS_PARSED' | 'NEW_RECORDS_ERROR' | 'NEW_RECORDS_MERGED';
    output: ImportRecordsReturnType | ImportErrorReturnType | MergeRecordsReturnType;
};
