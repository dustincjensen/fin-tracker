import { Pane } from 'evergreen-ui';
import React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { CategoriesFilter } from './categories-filter.component';
import { Categories } from './categories.component';
import { NewCategory } from './new-category.component';

export const ManageCategoryLayout = () => {
  const [showNewCategory, setShowNewCategory] = React.useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = React.useState<string>('');

  const openNewCategory = () => setShowNewCategory(true);
  const closeNewCategory = () => setShowNewCategory(false);

  return (
    <ErrorBoundary>
      <Pane display='grid' padding={20}>
        {showNewCategory && (
          <Pane marginBottom={20}>
            <NewCategory close={closeNewCategory} />
          </Pane>
        )}
        <Pane marginBottom={10}>
          <CategoriesFilter
            openNewCategory={openNewCategory}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </Pane>
        <Categories categoryFilter={categoryFilter} />
      </Pane>
    </ErrorBoundary>
  );
};
