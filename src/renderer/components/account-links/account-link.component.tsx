import * as React from 'react';
import { Link } from 'react-router-dom';
import { IAccount } from './account-links.interface';
import './account-link.component.scss';

export const AccountLink = (props: IAccount) => {
  const { id, name } = props;
  return (
    <Link
      key={id}
      to={`/account/${id}`}
      className="btn btn-primary account-link">
      {name}
    </Link>
  );
};
