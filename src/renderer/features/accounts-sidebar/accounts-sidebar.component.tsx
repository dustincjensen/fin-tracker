import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { AccountLink } from '../../components/account-link/account-link.component';
import { AccountSelectors } from '../../store/account/account.selectors';
import { accountTypeIconNames } from '../../utils/account.utils';

export const AccountsSidebar = () => {
  const accounts = useSelector(AccountSelectors.selectAccounts);

  return (
    <Pane display='flex' flexDirection='column'>
      {accounts.map(account => {
        const iconName = accountTypeIconNames[account.accountType];
        return <AccountLink key={account.id} id={account.id} name={account.name} iconName={iconName} />;
      })}
    </Pane>
  );
};
