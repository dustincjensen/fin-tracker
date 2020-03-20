import { Draft } from 'immer';
import { createDraftReducer } from '../draft.reducer';
import { CategoryActions } from './category.actions';
import { ICategory } from './category.interface';
import { ICategoryStore } from './category.store.interface';

const initialState: ICategoryStore = { categories: {} };

export const CategoryReducer = createDraftReducer(
  {
    [CategoryActions.SAVE_NEW_CATEGORY]: saveNewCategory,
    [CategoryActions.DELETE_CATEGORY]: deleteCategory,
  },
  initialState
);

function saveNewCategory(draft: Draft<ICategoryStore>, newCategory: ICategory) {
  const { id } = newCategory;
  draft.categories[id] = newCategory;
}

function deleteCategory(draft: Draft<ICategoryStore>, id: string) {
  delete draft.categories[id];
}
