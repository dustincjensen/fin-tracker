import { IRecord } from '../business/bank/record.interface';
import { sortAndCalculateBalance } from '../business/bank/util';

export function mergeRecords(startingBalance: number, newRecords: IRecord[], existingRecords: IRecord[]) {
  const sortedWithBalances = sortAndCalculateBalance(startingBalance, newRecords, existingRecords);
  return {
    type: 'IPC_NEW_RECORDS_MERGED',
    args: [sortedWithBalances],
  };
}
