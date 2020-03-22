import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { CategoriesFilter } from './categories-filter.component';
import { CategoriesContainer } from './categories.container';
import { NewCategoryContainer } from './new-category.container';

export const ManageCategoryLayout = () => {
  const [showNewCategory, setShowNewCategory] = React.useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = React.useState<string>('');

  const openNewCategory = () => setShowNewCategory(true);
  const closeNewCategory = () => setShowNewCategory(false);

  return (
    <Pane display='grid'>
      {showNewCategory && (
        <Pane marginBottom={20}>
          <NewCategoryContainer close={closeNewCategory} />
        </Pane>
      )}
      <Pane marginBottom={10}>
        <CategoriesFilter
          openNewCategory={openNewCategory}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
      </Pane>
      <CategoriesContainer categoryFilter={categoryFilter} />
    </Pane>
  );
};
