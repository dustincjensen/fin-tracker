import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { Accounts } from './accounts/accounts.component';
import { NewAccountContainer } from './new-account/new-account.container';

export const ManageAccountLayout = () => {
  return (
    <ErrorBoundary>
      <Pane display='grid' padding={20}>
        <Pane marginBottom={20}>
          <NewAccountContainer />
        </Pane>
        <Accounts />
      </Pane>
    </ErrorBoundary>
  );
};
