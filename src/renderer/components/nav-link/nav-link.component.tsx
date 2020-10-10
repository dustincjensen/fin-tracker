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
};

export const NavLink = ({ to, iconBefore, text }: NavLinkProps) => (
  <Button is={Link} appearance='minimal' to={to} iconBefore={iconBefore}>
    {text}
  </Button>
);
