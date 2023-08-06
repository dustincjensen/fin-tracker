import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AccountSelectors } from '../../store/account/account.selectors';

/**
 * Returns the array of accounts.
 */
export const useAccounts = () => {
  const accounts = useSelector(AccountSelectors.accounts);
  return {
    accounts: useMemo(() => Object.keys(accounts).map(id => accounts[id]), [accounts]),
  };
};
