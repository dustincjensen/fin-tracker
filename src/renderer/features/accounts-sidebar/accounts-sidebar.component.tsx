import { Pane, Heading } from 'evergreen-ui';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { NavLink } from '../../components/nav-link/nav-link.component';
import { IAccount } from '../../store/account/account.interface';
import { AccountSelectors } from '../../store/account/account.selectors';
import { accountRoutes, accountTypeIcons, isBankAccount, isInvestmentAccount } from '../../utils/account.utils';

const AccountLink = ({ account, pathname }: { account: IAccount; pathname: string }) => {
  const type = account.accountType;
  const toLocation = `${accountRoutes[type]}/${account.id}`;
  const icon = accountTypeIcons[account.accountType];
  const isSelected = pathname === toLocation;
  return (
    <NavLink
      key={account.id}
      to={toLocation}
      text={account.name}
      iconBefore={icon}
      isSelected={isSelected}
    />
  );
};

export const AccountsSidebar = () => {
  const { pathname } = useLocation<Location>();
  const accounts = useSelector(AccountSelectors.selectActiveAccounts);

  return (
    <Pane display='flex' flexDirection='column'>
      <Heading size={100} marginTop='20px' marginBottom='5px'>
        Accounts
      </Heading>
      {accounts
        .filter(a => isBankAccount(a.accountType))
        .map(account => <AccountLink key={account.id} account={account} pathname={pathname} />)}

      <Heading size={100} marginTop='20px' marginBottom='5px'>
        Investments
      </Heading>
      {accounts
        .filter(a => isInvestmentAccount(a.accountType))
        .map(account => <AccountLink key={account.id} account={account} pathname={pathname} />)}
    </Pane>
  );
};
