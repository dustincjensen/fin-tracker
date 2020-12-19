import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { AutoCategoriesFilter } from './auto-categories-filter/auto-categories-filter.component';
import { AutoCategoriesContainer } from './auto-categories/auto-categories.container';

export const ManageAutoCategoriesLayout = () => {
  const [autoCategoryFilter, setAutoCategoryFilter] = React.useState<string>('');
  const [showArchived, setShowArchived] = React.useState(false);

  const toggleShowArchived = React.useCallback(() => setShowArchived(a => !a), []);

  return (
    <ErrorBoundary>
      <Pane display='grid' padding={20}>
        <Pane marginBottom={10}>
          <AutoCategoriesFilter
            autoCategoryFilter={autoCategoryFilter}
            setAutoCategoryFilter={setAutoCategoryFilter}
            showArchived={showArchived}
            toggleShowArchived={toggleShowArchived}
          />
        </Pane>
        <AutoCategoriesContainer autoCategoryFilter={autoCategoryFilter} showArchived={showArchived} />
      </Pane>
    </ErrorBoundary>
  );
};
