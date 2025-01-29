import { Pane } from 'evergreen-ui';
import React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { Accounts } from './accounts.component';
import { NewAccount } from './new-account.component';

export const ManageAccountLayout = () => {
    return (
        <ErrorBoundary>
            <Pane display='grid' padding={20}>
                <Pane marginBottom={20}>
                    <NewAccount />
                </Pane>
                <Accounts />
            </Pane>
        </ErrorBoundary>
    );
};
