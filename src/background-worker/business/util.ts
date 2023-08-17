import { Record } from '../../app/models/record.type';

export function sortRecordsByDate(records: Record[]): Record[] {
    records.sort(sortByDate);
    return records;
}

// TODO improvement...
// if all new records have dates greater than the previous records
// then you don't need to recalculate those balances.
export function sortAndCalculateBalance(
    startingBalance: number,
    newRecords: Record[],
    previousRecords: Record[]
): Record[] {
    const allRecords = [...(newRecords || []), ...(previousRecords || [])];
    allRecords.sort(sortByDate);

    let runningBalance = startingBalance;

    allRecords.forEach(r => {
        runningBalance = parseFloat((runningBalance - (r.debit || 0) + (r.credit || 0)).toFixed(2));
        r.balance = runningBalance;
    });

    return allRecords;
}

// TODO DO some heavy testing on parsing to ensure that the date sorting for various QFX data sets works perfectly.
function sortByDate(a: Record, b: Record): number {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    if (aDate < bDate) return -1;
    if (aDate > bDate) return 1;

    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
}
