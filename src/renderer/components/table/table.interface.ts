export interface ITableStateProps<T> {
  tableHeader: IHeaderDefinition[];
  dataKeys: TableKeyType<T>[];
  rowData?: T[];
}

export interface ITableDispatchProps {
  actions?: IActionDefinition[];
}

export type TableKeyType<T> = keyof T | 'rowNumber';

export interface IHeaderDefinition {
  description: string;
  gridWidth: string;
}

export interface IActionDefinition {
  type: 'button';
  event: Function;
  text: string;
  classes?: string;
}
