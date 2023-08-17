import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CategorySelectors } from '../../store/category/category.selectors';
import { categorySort } from './category-sort';

export const useCategories = () => {
    const categories = useSelector(CategorySelectors.categories);

    return {
        categories: useMemo(
            () =>
                Object.keys(categories)
                    .map(id => categories[id])
                    .sort(categorySort),
            [categories]
        ),
    };
};
