import * as React from 'react';
import { withRouter } from 'react-router';
import { NewAccountContainer } from '../../containers/new-account.container';

const NewAccount = ({ history }) => {
  return (
    <div>
      <NewAccountContainer navigate={() => history.push('/')} />
    </div>
  );
};

export const NewAccountLayout = withRouter(NewAccount);
