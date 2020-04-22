import { IStore } from '../store.interface';

export class AutoCategorySelectors {
  /**
   * Returns all auto categories.
   *
   * @param state   The current application state.
   */
  public static autoCategories(state: IStore) {
    return state.autoCategories.autoCategories;
  }
}
