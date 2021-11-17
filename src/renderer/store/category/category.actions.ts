import { IAccount } from '../account/account.interface';
import { ICategory } from './category.interface';

export class CategoryActions {
  public static SAVE_NEW_CATEGORY = 'SAVE_NEW_CATEGORY';
  public static UPDATE_CATEGORY = 'UPDATE_CATEGORY';
  public static DELETE_CATEGORY = 'DELETE_CATEGORY';
  public static ADD_TRANSFER_CATEGORY = 'ADD_TRANSFER_CATEGORY';

  public static saveNewCategory = (category: ICategory) => ({
    type: CategoryActions.SAVE_NEW_CATEGORY,
    payload: category,
  });

  public static updateCategory = (category: ICategory) => ({
    type: CategoryActions.UPDATE_CATEGORY,
    payload: category,
  });

  public static deleteCategory = (category: ICategory) => ({
    type: CategoryActions.DELETE_CATEGORY,
    payload: category,
  });

  public static addTransferCategory = (account: IAccount) => ({
    type: CategoryActions.ADD_TRANSFER_CATEGORY,
    payload: account
  });
}
