import { WorkerReturnType } from '../../app/models/_worker-return.type';
import { Record } from '../../app/models/record.type';
import { sortAndCalculateBalance } from '../business/util';

export function mergeRecords(
    startingBalance: number,
    newRecords: Record[],
    existingRecords: Record[]
): WorkerReturnType {
    const sortedWithBalances = sortAndCalculateBalance(startingBalance, newRecords, existingRecords);
    return {
        type: 'NEW_RECORDS_MERGED',
        output: { records: sortedWithBalances },
    };
}
