import { Draft } from "immer";
import { createDraftReducer } from "../draft.reducer";
import { RecordActions } from '../record/record.actions';
import { AutoCategoryActions } from "./auto-category.actions";
import { IAutoCategory } from "./auto-category.interface";
import { IAutoCategoryStore } from './auto-category.store.interface';

const initialState: IAutoCategoryStore = {autoCategories: {}};

export const AutoCategoryReducer = createDraftReducer(
  {
    [RecordActions.SET_RECORD_AUTO_CATEGORY]: saveRecordAutoCategory,
    [AutoCategoryActions.DELETE_AUTO_CATEGORY]: deleteAutoCategory,
    // TODO delete account.
  },
  initialState
);

function saveRecordAutoCategory(draft: Draft<IAutoCategoryStore>, payload: {
  accountId: string; autoCategoryId: string; categoryId: string; description: string; overwriteExisting: boolean;
}) {
  const { autoCategoryId, accountId, categoryId, description } = payload;
  const autoCategoriesForAccount: IAutoCategory[] = draft.autoCategories[accountId];

  const newRecord: IAutoCategory = {
    id: autoCategoryId,
    accountId,
    categoryId,
    description
  };

  if (!autoCategoriesForAccount) {
    draft.autoCategories[accountId] = [newRecord];
  } else {
    draft.autoCategories[accountId].push(newRecord);
  }
}

function deleteAutoCategory(draft: Draft<IAutoCategoryStore>, autoCategory: IAutoCategory) {
  const { id, accountId } = autoCategory;
  const autoCategories = draft.autoCategories[accountId];
  const index = autoCategories.findIndex(ac => ac.id === id);

  if (index < 0) {
    throw Error(`Automatic category with id [${id}] does not exist.`);
  }

  draft.autoCategories[accountId] = [...autoCategories.slice(0, index), ...autoCategories.slice(index + 1)];
}