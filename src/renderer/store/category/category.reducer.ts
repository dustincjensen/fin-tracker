import { Draft } from 'immer';
import { isInvestmentAccount } from '../../utils/account.utils';
import { newGuid } from '../../utils/guid.utils';
import { AccountActions } from '../account/account.actions';
import { IAccount } from '../account/account.interface';
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
    [AccountActions.SAVE_NEW_ACCOUNT]: createTransferCategory,
    [AccountActions.DELETE_ACCOUNT]: deleteTransferCategory
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

function createTransferCategory(draft: Draft<ICategoryStore>, newAccount: IAccount) {
  if (isInvestmentAccount(newAccount.accountType)) {
    // TODO review
    const newCategory: ICategory = {
      id: newGuid(),
      name: `${newAccount.name} Transfer`,
      color: '#000',
      accountTransferId: newAccount.id
    };
    draft.categories[newCategory.id] = newCategory;
  }
}

function deleteTransferCategory(draft: Draft<ICategoryStore>, account: IAccount) {
  if (isInvestmentAccount(account.accountType)) {
    const category = Object.keys(draft.categories)
      .map(id => draft.categories[id])
      .find(c => c.accountTransferId === account.id);

    if (category) {
      delete draft.categories[category.id];
    }
  }
}
