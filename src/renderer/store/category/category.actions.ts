import { ICategory } from './category.interface';

export class CategoryActions {
  public static SAVE_NEW_CATEGORY = 'SAVE_NEW_CATEGORY';
  public static DELETE_CATEGORY = 'DELETE_CATEGORY';

  public static saveNewCategory = (category: ICategory) => ({
    type: CategoryActions.SAVE_NEW_CATEGORY,
    payload: category,
  });

  public static deleteCategory = (id: string) => ({
    type: CategoryActions.DELETE_CATEGORY,
    payload: id,
  });
}
