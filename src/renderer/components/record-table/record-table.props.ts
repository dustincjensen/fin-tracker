export default interface RecordTableProps {
  records: Record[]
}

interface Record {
  id: number;
  date: string;
  description: string;
  debit?: number;
  credit?: number;
}
