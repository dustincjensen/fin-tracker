import { createSelector } from 'reselect';
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

    /**
     * Returns the array of categories.
     *
     * @deprecated Do not use.
     */
    public static selectCategories = createSelector(CategorySelectors.categories, categories =>
        Object.keys(categories)
            .map(id => categories[id])
            .sort(CategorySelectors.sort)
    );

    /**
     * Returns the array of categories wihout transfer categories.
     *
     * @deprecated Do not use.
     */
    public static selectDisplayCategories = createSelector(CategorySelectors.categories, categories =>
        Object.keys(categories)
            .map(id => categories[id])
            .filter(c => !c.accountTransferId)
            .sort(CategorySelectors.sort)
    );

    private static sort(c1: { name: string }, c2: { name: string }) {
        const c1Name = c1.name.toLowerCase();
        const c2Name = c2.name.toLowerCase();
        return c1Name < c2Name ? -1 : c1Name > c2Name ? 1 : 0;
    }
}
