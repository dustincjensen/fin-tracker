import { Button } from 'evergreen-ui';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IAccountLinkProps } from './account-link.props.interface';

export const AccountLink: React.FC<IAccountLinkProps> = ({ id, name, iconName }) => {
  return (
    <Button is={Link} appearance='minimal' iconBefore={iconName} to={`/account/${id}`}>
      {name}
    </Button>
  );
};
