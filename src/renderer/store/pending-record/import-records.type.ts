import { Dispatch } from 'redux';
import { AccountType } from '../account/account.type';
import { IAutoCategory } from '../auto-category/auto-category.interface';

export type ImportRecordsFunc = (
  dispatch: Dispatch,
  accountId: string,
  filePath: string,
  autoCategories: IAutoCategory[],
  accountType?: AccountType
) => void;
