import { IAccount } from '../../../store/account/account.interface';
import { IAutoCategory } from '../../../store/auto-category/auto-category.interface';
import { ParseType } from '../../../store/pending-record/parse.type';

export interface INewRecordsProps {
  accounts: IAccount[];

  autoCategories: { [accountId: string]: IAutoCategory[] };

  /**
   * The error that occurred when trying to import, if any.
   */
  error: string;

  importAction: (account: IAccount, autoCategories: IAutoCategory[], file, importMethod: ParseType) => void;

  /**
   * When navigating from an account we receive an ID,
   * so we can pre-fill the selector.
   */
  accountId: string;
}
