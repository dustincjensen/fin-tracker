import { Pane } from 'evergreen-ui';
import React, { useState, useCallback } from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { AutoCategoriesFilter } from './auto-categories-filter.component';
import { AutoCategories } from './auto-categories.component';

export const ManageAutoCategoriesLayout = () => {
  const [autoCategoryFilter, setAutoCategoryFilter] = useState<string>('');
  const [showArchived, setShowArchived] = useState(false);

  const toggleShowArchived = useCallback(() => setShowArchived(a => !a), []);

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
        <AutoCategories autoCategoryFilter={autoCategoryFilter} showArchived={showArchived} />
      </Pane>
    </ErrorBoundary>
  );
};
