import moment from 'moment';

type RecordType = { id: string; date: string };

// TODO docs
export function sortByDate(a: RecordType, b: RecordType): number {
  // TODO moment complains about the date format provided if not ISO, but it works...
  const aDate = moment(a.date);
  const bDate = moment(b.date);

  if (aDate.isBefore(bDate)) return -1;
  if (aDate.isAfter(bDate)) return 1;

  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

// TODO docs
export function sortByDateDescending(a: RecordType, b: RecordType): number {
  // TODO moment complains about the date format provided if not ISO, but it works...
  const aDate = moment(a.date);
  const bDate = moment(b.date);

  if (bDate.isBefore(aDate)) return -1;
  if (bDate.isAfter(aDate)) return 1;

  if (b.id < a.id) return -1;
  if (b.id > a.id) return 1;
  return 0;
}
