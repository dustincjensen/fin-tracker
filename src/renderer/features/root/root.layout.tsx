import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { AccountLayout } from '../account/account.layout';
import { HomeLayout } from '../home/home.layout';
import { ImportLayout } from '../import/import.layout';
import { ManageAccountLayout } from '../manage-accounts/manage-accounts.layout';
import { ManageAutoCategories } from '../manage-auto-categories/manage-auto-categories.layout';
import { ManageCategoryLayout } from '../manage-categories/manage-categories.layout';
import { SidebarLayout } from '../sidebar/sidebar.layout';

export const RootLayout = () => {
  return (
    <Pane height='100%' display='grid' gridTemplateColumns='auto 1fr' borderTop className='app_fade_in'>
      <SidebarLayout />
      <Pane padding={20} overflowX='hidden' overflowY='auto' className='scroll-bar-styled'>
        <Switch>
          <Route exact path='/' component={HomeLayout} />
          <Route exact path='/accounts' component={ManageAccountLayout} />
          <Route exact path='/autoCategories' component={ManageAutoCategories} />
          <Route exact path='/categories' component={ManageCategoryLayout} />
          <Route exact path='/account/:accountId' component={AccountLayout} />
          <Route exact path='/import/:accountId?' component={ImportLayout} />
        </Switch>
      </Pane>
    </Pane>
  );
};
