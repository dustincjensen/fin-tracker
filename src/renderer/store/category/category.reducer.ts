import produce from 'immer';
import * as categoryActions from './category.actions';
import { ICategory } from './category.interface';

const initialState: { [id: string]: ICategory } = {};

export const CategoryReducer = produce((state, action) => {
  switch (action.type) {
    case categoryActions.SAVE_NEW_CATEGORY: {
      saveNewCategory(state, action);
      break;
    }
    case categoryActions.DELETE_CATEGORY: {
      deleteCategory(state, action);
      break;
    }
  }
}, initialState);

function saveNewCategory(state, action) {
  const { id } = action.payload;
  state[id] = action.payload;
}

function deleteCategory(state, action) {
  delete state[action.payload];
}
