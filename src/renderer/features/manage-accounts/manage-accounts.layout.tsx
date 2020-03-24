import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { AccountsContainer } from './accounts.container';
import { NewAccountContainer } from './new-account.container';

const ManageAccount = () => {
  return (
    <Pane display='grid'>
      <Pane marginBottom={20}>
        <NewAccountContainer />
      </Pane>
      <AccountsContainer />
    </Pane>
  );
};

export const ManageAccountLayout = withRouter(ManageAccount);
