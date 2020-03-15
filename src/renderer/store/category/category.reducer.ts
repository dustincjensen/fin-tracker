import { ICategory } from './category.interface';
import * as categoryActions from './category.actions';
import produce from 'immer';

const initialState: { [id: string]: ICategory } = {};

export const CategoryReducer = produce((state, action) => {
  switch (action.type) {
    case categoryActions.SAVE_NEW_CATEGORY:{
      saveNewCategory(state, action);
      break;
    }
    case categoryActions.DELETE_CATEGORY: {
      deleteCategory(state, action);
      break;
    }
  }
}, initialState);

const saveNewCategory = (state, action) => {
  const { id } = action.payload;
  state[id] = action.payload;
};

const deleteCategory = (state, action) => {
  delete state[action.payload];
};