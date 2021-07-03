import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { NavLink } from '../../components/nav-link/nav-link.component';
import { AccountSelectors } from '../../store/account/account.selectors';
import { accountTypeIcons } from '../../utils/account.utils';

export const AccountsSidebar = () => {
  const location = useLocation();
  const accounts = useSelector(AccountSelectors.selectActiveAccounts);

  return (
    <Pane display='flex' flexDirection='column'>
      {accounts.map(account => {
        const toLocation = `/account/${account.id}`;
        const icon = accountTypeIcons[account.accountType];
        const isSelected = location.pathname === toLocation;
        return (
          <NavLink
            key={account.id}
            to={`/account/${account.id}`}
            text={account.name}
            iconBefore={icon}
            isSelected={isSelected}
          />
        );
      })}
    </Pane>
  );
};
