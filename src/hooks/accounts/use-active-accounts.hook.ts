import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AccountSelectors } from '../../store/account/account.selectors';

/**
 * Returns the array of active accounts.
 */
export const useActiveAccounts = () => {
  const accounts = useSelector(AccountSelectors.accounts);
  return {
    activeAccounts: useMemo(
      () =>
        Object.keys(accounts)
          .map(id => accounts[id])
          .filter(a => !a.archived),
      [accounts]
    ),
  };
};
