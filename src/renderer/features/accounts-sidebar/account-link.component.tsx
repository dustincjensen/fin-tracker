import * as React from 'react';
import { Link } from 'react-router-dom';
import { IAccount } from './account-links.component.interface';
import './account-link.component.scss';

export const AccountLink = (props: IAccount) => {
  const { id, name } = props;
  return (
    <Link
      to={`/account/${id}`}
      className="btn btn-primary account-link">
      {name}
    </Link>
  );
};
