import { Button } from 'evergreen-ui';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IconType } from '../../utils/account.utils';

type NavLinkProps = {
  /** The route to navigate to. */
  to: string;

  /** The evergreen ui icon to display. */
  iconBefore: IconType;

  /** The text to display for the button. */
  text: string;

  /** Whether or not the current route is active. */
  isSelected?: boolean;
};

export const NavLink = ({ to, iconBefore, text, isSelected }: NavLinkProps) => (
  <Button
    is={Link}
    appearance={isSelected ? 'primary' : 'minimal'}
    to={to}
    iconBefore={iconBefore}
    width='100%'
    display='flex'
    justifyContent='flex-start'
  >
    {text}
  </Button>
);
