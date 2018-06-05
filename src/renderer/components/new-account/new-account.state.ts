export interface INewAccountState {
  name: string;
  startYear: number;
  startMonth: number;
  startingBalance: number;
  parseType: ParseType;
}

// TODO Do I need to recreate this in component state?
type ParseType =
  'ScotiabankChequing' |
  'ScotiabankSavings' |
  'ScotiabankVisa';
