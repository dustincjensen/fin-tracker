import { Button } from 'evergreen-ui';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IAccount } from './account-links.component.interface';

export const AccountLink = (props: IAccount) => {
  const { id, name } = props;
  return (
    <Button is={Link} appearance='minimal' iconBefore='dollar' to={`/account/${id}`}>
      {name}
    </Button>
  );
};
