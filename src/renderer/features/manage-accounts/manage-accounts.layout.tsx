import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { AccountsContainer } from './accounts.container';
import { NewAccountContainer } from './new-account.container';

const ManageAccount = () => {
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

export const ManageAccountLayout = withRouter(ManageAccount);
