import { IRecord } from '../../store/record/record.interface';
import { IStore } from '../../store/store.interface';

export interface IAccountMonthlyProps
  extends IAccountMonthlyStateProps,
    IAccountMonthlyDispatchProps,
    IAccountMonthlyOwnProps {}

type RecordType = IRecord & {
  category: {
    color: string;
    label: string;
    value: string;
  };
};

export interface IAccountMonthlyStateProps {
  /**
   * The records to display.
   */
  records: RecordType[];

  /**
   * The list of categories to choose from for each record.
   */
  categories: Array<{
    color: string;
    label: string;
    value: string;
  }>;
}

export interface IAccountMonthlyDispatchProps {
  /**
   * Function to update a category in state.
   */
  updateCategory: (recordId: string, categoryId: string) => void;
}

export interface IAccountMonthlyOwnProps {
  /**
   * The ID of the account to display.
   */
  accountId: string;

  /**
   * The first date of the month to get the data for.
   */
  date: string;

  /**
   * A selector to access the store to get the data
   * for that specified month and account.
   */
  stateSelector: (state: IStore, accountId: string, date: string) => IRecord[];
}
