import { sortAndCalculateBalance } from '../business/bank/util';
import { Record } from '../business/bank/record.interface';

export function mergeRecords(startingBalance: number, newRecords: Record[], existingRecords: Record[]) {
    const sortedWithBalances = sortAndCalculateBalance(startingBalance, newRecords, existingRecords);
    return {
        type: 'IPC_NEW_RECORDS_MERGED',
        args: [sortedWithBalances]
    };
}
