import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { AccountsContainer } from './accounts/accounts.container';
import { NewAccountContainer } from './new-account/new-account.container';

export const ManageAccountLayout = () => {
  return (
    <ErrorBoundary>
      <Pane display='grid'>
        <Pane marginBottom={20}>
          <NewAccountContainer />
        </Pane>
        <AccountsContainer />
      </Pane>
    </ErrorBoundary>
  );
};
