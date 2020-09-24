import { sortAndCalculateBalance } from '../business/util';
import { IRecord } from '../interfaces/record.interface';

export function mergeRecords(startingBalance: number, newRecords: IRecord[], existingRecords: IRecord[]) {
  const sortedWithBalances = sortAndCalculateBalance(startingBalance, newRecords, existingRecords);
  return {
    type: 'IPC_NEW_RECORDS_MERGED',
    args: [sortedWithBalances],
  };
}
