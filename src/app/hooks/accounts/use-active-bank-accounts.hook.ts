import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AccountSelectors } from '../../store/account/account.selectors';
import { isBankAccount } from '../../utils/account.utils';

/**
 * Returns the array of active bank accounts.
 */
export const useActiveBankAccounts = () => {
    const accounts = useSelector(AccountSelectors.accounts);
    return {
        activeBankAccounts: useMemo(
            () =>
                Object.keys(accounts)
                    .map(id => accounts[id])
                    .filter(a => !a.archived && isBankAccount(a.accountType)),
            [accounts]
        ),
    };
};
