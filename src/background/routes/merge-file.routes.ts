import { sortAndCalculateBalance } from '../business/bank/util';
import { IRecord } from '../business/bank/record.interface';

export function mergeRecords(startingBalance: number, newRecords: IRecord[], existingRecords: IRecord[]) {
  const sortedWithBalances = sortAndCalculateBalance(startingBalance, newRecords, existingRecords);
  return {
    type: 'IPC_NEW_RECORDS_MERGED',
    args: [sortedWithBalances],
  };
}
