import * as React from 'react';
import { withRouter } from 'react-router';
import { NewAccountContainer } from '../../containers/new-account.container';
import { AccountsContainer } from '../../containers/accounts.container';
import './manage-accounts.layout.scss';

const ManageAccount = ({ history }) => {
  return (
    <div className="manage-accounts">
      <NewAccountContainer navigate={() => history.push('/')} />
      <AccountsContainer />
    </div>
  );
};

export const ManageAccountLayout = withRouter(ManageAccount);
