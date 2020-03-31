import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { AccountContainer } from './account.container';

const account: React.FC<RouteComponentProps<{ accountId: string }>> = props => {
  const { accountId } = props.match.params;
  return (
    <ErrorBoundary>
      <AccountContainer accountId={accountId} />
    </ErrorBoundary>
  );
};

export const AccountLayout = withRouter(account);
