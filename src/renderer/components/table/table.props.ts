export interface ITableProps<T> {
  tableHeader: IHeaderDefinition[];
  dataKeys: TableKeyType<T>[];
  rowData?: T[];
}

export type TableKeyType<T> = keyof T | 'rowNumber';

export interface IHeaderDefinition {
  description: string;
  gridWidth: string;
}
