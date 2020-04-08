import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { AutoCategoriesFilter } from './auto-categories-filter.component';
import { AutoCategoriesContainer } from './auto-categories.container';

export const ManageAutoCategories = () => {
  const [autoCategoryFilter, setAutoCategoryFilter] = React.useState<string>('');

    return (
      <ErrorBoundary>
        <Pane display='grid'>
          <Pane marginBottom={10}>
            <AutoCategoriesFilter
              autoCategoryFilter={autoCategoryFilter}
              setAutoCategoryFilter={setAutoCategoryFilter}
            />
          </Pane>
          <AutoCategoriesContainer autoCategoryFilter={autoCategoryFilter}/>
        </Pane>
      </ErrorBoundary>
    );
};