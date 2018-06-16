import { ICategory } from './category.interface';
import * as categoryActions from './category.actions';

const initialState: ICategory[] = [];

export function CategoryReducer(state = initialState, action): ICategory[] {
  switch (action.type) {
    case categoryActions.SAVE_NEW_CATEGORY:
      return [
        ...state,
        ...action.payload
      ];
    case categoryActions.DELETE_CATEGORY:
      const filteredState = state.filter(s => s.id !== action.payload);
      return [
        ...filteredState
      ];
  }
  return state;
}
