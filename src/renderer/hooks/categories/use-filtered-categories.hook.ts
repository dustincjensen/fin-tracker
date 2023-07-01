import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CategorySelectors } from '../../store/category/category.selectors';

const sort = (c1: { name: string }, c2: { name: string }) => {
  const c1Name = c1.name.toLowerCase();
  const c2Name = c2.name.toLowerCase();
  return c1Name < c2Name ? -1 : c1Name > c2Name ? 1 : 0;
};

export const useFilteredCategories = (filter: string) => {
  const unfilteredCategories = useSelector(CategorySelectors.categories);

  const filteredCategories = useMemo(() => {
    const mappedCategories = Object.keys(unfilteredCategories)
      .map(id => unfilteredCategories[id])
      .sort(sort);

    return filter?.length > 0
      ? mappedCategories.filter(c => c.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
      : mappedCategories;
  }, [unfilteredCategories, filter]);

  return { filteredCategories };
};
