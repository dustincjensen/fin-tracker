import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { AccountContainer } from './account/account.container';

const account = (props: RouteComponentProps<{ accountId: string }>) => {
  return (
    <ErrorBoundary>
      <AccountContainer accountId={props.match.params.accountId} />
    </ErrorBoundary>
  );
};

export const AccountLayout = withRouter(account);
