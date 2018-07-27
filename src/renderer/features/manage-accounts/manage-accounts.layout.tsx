import * as React from 'react';
import { withRouter } from 'react-router';
import { NewAccountContainer } from './new-account.container';
import { AccountsContainer } from './accounts.container';
import './manage-accounts.layout.scss';

const ManageAccount = ({ history }) => {
  return (
    <div className="manage-accounts">
      <NewAccountContainer />
      <AccountsContainer />
    </div>
  );
};

export const ManageAccountLayout = withRouter(ManageAccount);
