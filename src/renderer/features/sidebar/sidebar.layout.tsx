import * as path from 'path';
import { remote } from 'electron';
import {
  AutomaticUpdatesIcon,
  BankAccountIcon,
  Button,
  DatabaseIcon,
  GroupObjectsIcon,
  Heading,
  HomeIcon,
  ImportIcon,
  majorScale,
  Pane,
  Switch,
  Text,
} from 'evergreen-ui';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavLink } from '../../components/nav-link/nav-link.component';
import { AccountsSidebar } from '../accounts-sidebar/accounts-sidebar.component';

const appVersion = remote.app.getVersion();

const openUserPath = () => {
  const appStateJson = path.join(remote.app.getPath('userData'), 'appState.json');
  remote.shell.showItemInFolder(appStateJson);
};

export const SidebarLayout = (props: {
  theme: boolean;
  toggleTheme: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const location = useLocation();
  return (
    <Pane background='tint1' display='grid' gridTemplateRows='auto auto 1fr auto auto' padding={20} borderRight>
      <Button
        is={Link}
        to='/import'
        iconBefore={ImportIcon}
        height={majorScale(7)}
        marginBottom='15px'
        appearance={location.pathname === '/import' ? 'primary' : 'minimal'}
      >
        Import
      </Button>
      <NavLink to='/' iconBefore={HomeIcon} text='Home' isSelected={location.pathname === '/'} />
      <AccountsSidebar />
      <Pane display='flex' flexDirection='column'>
        <Heading size={100} marginBottom='5px'>
          Settings
        </Heading>

        <Pane display='flex' alignItems='center' marginBottom={5}>
          <Switch checked={props.theme} onChange={evt => props.toggleTheme(evt.target.checked)} />
          <Text marginLeft={5}>Use New Theme</Text>
        </Pane>

        <NavLink
          to='/accounts'
          iconBefore={BankAccountIcon}
          text='Accounts'
          isSelected={location.pathname === '/accounts'}
        />
        <NavLink
          to='/categories'
          iconBefore={GroupObjectsIcon}
          text='Categories'
          isSelected={location.pathname === '/categories'}
        />
        <NavLink
          to='/autoCategories'
          iconBefore={AutomaticUpdatesIcon}
          text='Auto Categories'
          isSelected={location.pathname === '/autoCategories'}
        />
      </Pane>
      <Button
        onClick={openUserPath}
        appearance='minimal'
        iconBefore={DatabaseIcon}
        display='flex'
        justifyContent='flex-start'
      >
        User Data
      </Button>
      <Text paddingTop={20} size={300} textAlign='center'>
        Version: {appVersion}
      </Text>
    </Pane>
  );
};
