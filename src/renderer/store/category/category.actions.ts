import ICategory from './category.interface';

export const SAVE_NEW_CATEGORY = 'SAVE_NEW_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export function SaveNewCategory(category: ICategory) {
  return {
    type: SAVE_NEW_CATEGORY,
    payload: category
  };
}

export function DeleteCategory(id: string) {
  return {
    type: DELETE_CATEGORY,
    payload: id
  };
}
