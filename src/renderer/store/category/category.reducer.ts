import { Draft } from 'immer';
import { createDraftReducer } from '../draft.reducer';
import { CategoryActions } from './category.actions';
import { ICategory } from './category.interface';
import { ICategoryStore } from './category.store.interface';

const initialState: ICategoryStore = { categories: {} };

export const CategoryReducer = createDraftReducer(
  {
    [CategoryActions.SAVE_NEW_CATEGORY]: saveNewCategory,
    [CategoryActions.UPDATE_CATEGORY]: updateCategory,
    [CategoryActions.DELETE_CATEGORY]: deleteCategory,
  },
  initialState
);

function saveNewCategory(draft: Draft<ICategoryStore>, newCategory: ICategory) {
  const { id } = newCategory;
  draft.categories[id] = newCategory;
}

function updateCategory(draft: Draft<ICategoryStore>, updatedCategory: ICategory) {
  const { id } = updatedCategory;
  if (!draft.categories[id]) {
    throw Error('Category does not exist.');
  }
  draft.categories[id] = updatedCategory;
}

function deleteCategory(draft: Draft<ICategoryStore>, deletedCategory: ICategory) {
  delete draft.categories[deletedCategory.id];
}
