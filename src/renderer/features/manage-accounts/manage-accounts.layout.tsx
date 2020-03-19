import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { AccountsContainer } from './accounts.container';
import { NewAccountContainer } from './new-account.container';
import './manage-accounts.layout.scss';

const ManageAccount = () => {
  return (
    <div className='manage-accounts'>
      <NewAccountContainer />
      <AccountsContainer />
    </div>
  );
};

export const ManageAccountLayout = withRouter(ManageAccount);
