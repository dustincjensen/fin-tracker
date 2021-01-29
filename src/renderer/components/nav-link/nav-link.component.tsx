import { Button, IconName } from 'evergreen-ui';
import * as React from 'react';
import { Link } from 'react-router-dom';

type NavLinkProps = {
  /** The route to navigate to. */
  to: string;

  /** The evergreen ui icon to display. */
  iconBefore: IconName;

  /** The text to display for the button. */
  text: string;

  /** Whether or not the current route is active. */
  isSelected?: boolean;
};

export const NavLink = ({ to, iconBefore, text, isSelected }: NavLinkProps) => (
  <Button is={Link} appearance={isSelected ? 'primary' : 'minimal'} to={to} iconBefore={iconBefore} width='100%'>
    {text}
  </Button>
);
