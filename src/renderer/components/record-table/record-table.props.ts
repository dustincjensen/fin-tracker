export default interface RecordTableProps {
  records?: Record[];
}

interface Record {
  id: string;
  accountId: string;
  date: string;
  description: string;
  debit?: number;
  credit?: number;
}
