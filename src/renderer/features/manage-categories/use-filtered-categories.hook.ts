import { useMemo } from 'react';
import { useCategories } from '../../hooks/categories/use-categories.hook';

export const useFilteredCategories = (filter: string) => {
  const { categories } = useCategories();

  return {
    filteredCategories: useMemo(
      () =>
        filter?.length > 0
          ? categories.filter(c => c.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
          : categories,
      [categories, filter]
    ),
  };
};
