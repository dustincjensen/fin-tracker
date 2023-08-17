import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CategorySelectors } from '../../store/category/category.selectors';
import { categorySort } from './category-sort';

export const useDisplayCategories = () => {
    const categories = useSelector(CategorySelectors.categories);

    return {
        categories: useMemo(
            () =>
                Object.keys(categories)
                    .map(id => categories[id])
                    .filter(c => !c.accountTransferId)
                    .sort(categorySort),
            [categories]
        ),
    };
};
