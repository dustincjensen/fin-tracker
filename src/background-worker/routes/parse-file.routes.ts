/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImportErrorReturnType, ImportRecordsReturnType, WorkerReturnType } from '../../app/models/_worker-return.type';
import { AutoCategory } from '../../app/models/auto-category.type';
import { Record } from '../../app/models/record.type';
import { parse as qfxParse } from '../business/qfx';
import { parse as quickenParse } from '../business/quicken';
import { sortRecordsByDate } from '../business/util';

export function parseQuickenToRecords(
    accountId: string,
    file: any,
    autoCategories: AutoCategory[],
    accountType: 'Chequing' | 'Savings' | 'CreditCard'
) {
    return parse(quickenParse, accountId, file, autoCategories, accountType);
}

export function parseQfxToRecords(
    accountId: string,
    file: any,
    autoCategories: AutoCategory[],
    accountType: 'Chequing' | 'Savings' | 'CreditCard'
) {
    return parse(qfxParse, accountId, file, autoCategories, accountType);
}

function parse(
    method: (
        accountId: string,
        file: any,
        autoCategories: AutoCategory[],
        accountType?: 'Chequing' | 'Savings' | 'CreditCard'
    ) => Record[],
    accountId: string,
    file: any,
    autoCategories: AutoCategory[],
    accountType?: 'Chequing' | 'Savings' | 'CreditCard'
): WorkerReturnType {
    try {
        const parsedFileRecords = method(accountId, file, autoCategories, accountType);
        if (!parsedFileRecords || parsedFileRecords.length === 0) {
            throw new Error('Unable to parse transactions from file.');
        }

        const sorted = sortRecordsByDate(parsedFileRecords);
        const fileName = file.name;
        return {
            type: 'NEW_RECORDS_PARSED',
            output: { records: sorted, accountId, filePath: file.path, fileName } as ImportRecordsReturnType,
        };
    } catch (error: any) {
        const fileName = file.name;
        return {
            type: 'NEW_RECORDS_ERROR',
            output: { error: error.message, filePath: file.path, fileName } as ImportErrorReturnType,
        };
    }
}
