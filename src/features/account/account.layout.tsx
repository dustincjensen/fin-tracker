import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { AccountContainer } from './account/account.container';

export const AccountLayout = (props: RouteComponentProps<{ accountId: string }>) => {
    return (
        <ErrorBoundary>
            <AccountContainer accountId={props.match.params.accountId} />
        </ErrorBoundary>
    );
};
