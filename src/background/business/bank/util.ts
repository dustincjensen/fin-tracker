import moment from 'moment';
import { IRecord } from './record.interface';

export function sortRecordsByDate(records: IRecord[]): IRecord[] {
  records.sort(sortByDate);
  return records;
}

// TODO improvement...
// if all new records have dates greater than the previous records
// then you don't need to recalculate those balances.
export function sortAndCalculateBalance(
  startingBalance: number,
  newRecords: IRecord[],
  previousRecords: IRecord[]
): IRecord[] {
  const allRecords = [...(newRecords || []), ...(previousRecords || [])];
  allRecords.sort(sortByDate);

  let runningBalance = startingBalance;

  allRecords.forEach(r => {
    runningBalance = parseFloat((runningBalance - (r.debit || 0) + (r.credit || 0)).toFixed(2));
    r.balance = runningBalance;
  });

  return allRecords;
}

function sortByDate(a: IRecord, b: IRecord): number {
  // TODO moment complains about the date format provided if not ISO, but it works...
  const aDate = moment(a.date);
  const bDate = moment(b.date);

  if (aDate.isBefore(bDate)) return -1;
  if (aDate.isAfter(bDate)) return 1;

  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}
