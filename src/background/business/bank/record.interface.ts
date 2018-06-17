export interface Record {
  id: number;
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance?: number;
}
