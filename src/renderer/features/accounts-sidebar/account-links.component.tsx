import { Pane, IconName } from 'evergreen-ui';
import * as React from 'react';
import { AccountLink } from './account-link.component';
import { IAccountProps } from './account-links.component.interface';

// TODO replace this with a better implementation...
// Maybe let the account pick their icon?
const parseTypeToIconName: { [type: string]: IconName } = {
  ['ScotiabankChequing']: 'bank-account',
  ['ScotiabankSavings']: 'bank-account',
  ['ScotiabankVisa']: 'credit-card',
};

export const AccountLinks = (props: IAccountProps) => {
  const { accounts } = props;

  const links = Object.keys(accounts).map((accountId: string) => {
    const acc = accounts[accountId];
    return <AccountLink key={acc.id} id={acc.id} name={acc.name} iconName={parseTypeToIconName[acc.parseType]} />;
  });

  return (
    <Pane display='flex' flexDirection='column'>
      {links}
    </Pane>
  );
};
