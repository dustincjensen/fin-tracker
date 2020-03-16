import * as React from 'react';
import { IAccountProps, IAccount } from './account-links.component.interface';
import { AccountLink } from './account-link.component';
import { Pane } from 'evergreen-ui';

export const AccountLinks = (props: IAccountProps) => {
  const { accounts } = props;

  const links = Object.keys(accounts).map((accountId: string) => {
    const a: IAccount = accounts[accountId];
    return <AccountLink key={a.id} id={a.id} name={a.name} />;
  });

  return (
    <Pane display='flex' flexDirection='column'>
      {links}
    </Pane>
  );
};
