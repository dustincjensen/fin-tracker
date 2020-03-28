import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { accountTypeIconNames } from '../../utils/account.utils';
import { AccountLink } from './account-link.component';
import { IAccountProps } from './account-links.component.interface';

export const AccountLinks = (props: IAccountProps) => {
  const { accounts } = props;

  const links = Object.keys(accounts).map((accountId: string) => {
    const acc = accounts[accountId];
    const iconName = accountTypeIconNames[acc.accountType];
    return <AccountLink key={acc.id} id={acc.id} name={acc.name} iconName={iconName} />;
  });

  return (
    <Pane display='flex' flexDirection='column'>
      {links}
    </Pane>
  );
};
