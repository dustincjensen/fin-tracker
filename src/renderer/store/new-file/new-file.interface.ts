export default interface INewFile {
  chequingRecords?: Record[];
  savingsRecords?: Record[];
  visaRecords?: Record[];
}

export interface Record {
  id: number;
  date: string;
  description: string;
  debit?: number;
  credit?: number;
}
