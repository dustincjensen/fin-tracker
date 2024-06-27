import { IStore } from '../store.interface';

export class CategorySelectors {
    /**
     * Returns all categories.
     *
     * @param state   The current application state.
     */
    public static categories(state: IStore) {
        return state.categories.categories;
    }
}
