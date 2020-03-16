export interface INewAccountProps {
  saveNewAccount: (account: any) => void;
}

export interface INewAccountState {
  name: string;
  startYear: number;
  startMonth: number;
  startingBalance: number;
  parseType: ParseType;
}

type ParseType = 'ScotiabankChequing' | 'ScotiabankSavings' | 'ScotiabankVisa';
