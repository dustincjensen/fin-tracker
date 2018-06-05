import * as React from 'react';
import NewAccountContainer from '../../containers/new-account.container';
import { withRouter } from 'react-router';


const NewAccount = ({ history }) => {
  return (
    <div>
      <NewAccountContainer navigate={() => history.push('/')} />
    </div>
  );
};

export default withRouter(NewAccount);
