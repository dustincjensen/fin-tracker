import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { Account } from './account.component';

export const AccountLayout = (props: RouteComponentProps<{ accountId: string }>) => {
    return (
        <ErrorBoundary>
            <Account accountId={props.match.params.accountId} />
        </ErrorBoundary>
    );
};
