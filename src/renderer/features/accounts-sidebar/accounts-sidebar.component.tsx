import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { AccountLink } from '../../components/account-link/account-link.component';
import { accountTypeIconNames } from '../../utils/account.utils';
import { IAccountsSidebarProps } from './accounts-sidebar.props.interface';

export const AccountsSidebar = (props: IAccountsSidebarProps) => {
  const { accounts } = props;

  return (
    <Pane display='flex' flexDirection='column'>
      {accounts.map(account => {
        const iconName = accountTypeIconNames[account.accountType];
        return <AccountLink key={account.id} id={account.id} name={account.name} iconName={iconName} />;
      })}
    </Pane>
  );
};
