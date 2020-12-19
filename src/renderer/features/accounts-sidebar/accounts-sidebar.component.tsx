import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from '../../components/nav-link/nav-link.component';
import { AccountSelectors } from '../../store/account/account.selectors';
import { accountTypeIconNames } from '../../utils/account.utils';

export const AccountsSidebar = () => {
  const accounts = useSelector(AccountSelectors.selectActiveAccounts);

  return (
    <Pane display='flex' flexDirection='column'>
      {accounts.map(account => {
        const iconName = accountTypeIconNames[account.accountType];
        return <NavLink key={account.id} to={`/account/${account.id}`} text={account.name} iconBefore={iconName} />;
      })}
    </Pane>
  );
};
