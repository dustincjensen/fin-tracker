import { Dispatch } from 'redux';
import { AccountType } from '../account/account.type';

export type ImportRecordsFunc = (
  dispatch: Dispatch,
  accountId: string,
  filePath: string,
  accountType?: AccountType
) => void;
