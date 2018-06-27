import * as React from 'react';
import { IAccountProps, IAccount } from './account-links.component.interface';
import { AccountLink } from './account-link.component';
import './account-links.component.scss';

export const AccountLinks = (props: IAccountProps) => {
  const { accounts } = props;

  const links = Object.keys(accounts).map((accountId: string) => {
    const a: IAccount = accounts[accountId];
    return <AccountLink key={a.id} id={a.id} name={a.name} />;
  });

  return (
    <div className="account-links">
      <div>Accounts</div>
      <hr />
      {links}
    </div>
  );
};
