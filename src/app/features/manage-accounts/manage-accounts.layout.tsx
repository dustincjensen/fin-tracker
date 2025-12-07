import { Button, Pane, SortIcon } from 'evergreen-ui';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { useAccounts } from '../../hooks/accounts/use-accounts.hook';
import { updateAccountOrder } from '../../store/account/account-slice';
import { Accounts } from './accounts.component';
import { NewAccount } from './new-account.component';

export const ManageAccountLayout = () => {
    const dispatch = useDispatch();
    const { accounts } = useAccounts();
    const [isReordering, setIsReordering] = useState(false);
    const [order, setOrder] = useState(() => accounts.map(account => account.id));

    const handleToggleReordering = useCallback(() => {
        if (isReordering) {
            dispatch(
                updateAccountOrder(
                    order.map((id, index) => ({
                        id,
                        order: index,
                    }))
                )
            );
        }
        setIsReordering(!isReordering);
    }, [dispatch, isReordering, order]);

    return (
        <ErrorBoundary>
            <Pane display='grid' padding={20}>
                <Pane marginBottom={20}>
                    <NewAccount />
                </Pane>
                <Pane display='flex' justifyContent='flex-end'>
                    <Button iconBefore={SortIcon} marginBottom={20} onClick={handleToggleReordering}>
                        {isReordering ? 'Save Re-ordering' : 'Toggle Re-ordering'}
                    </Button>
                </Pane>
                <Accounts isReordering={isReordering} accounts={accounts} order={order} setOrder={setOrder} />
            </Pane>
        </ErrorBoundary>
    );
};
