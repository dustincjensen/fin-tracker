import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { AccountLayout } from '../account/account.layout';
import { HomeLayout } from '../home/home.layout';
import { ImportLayout } from '../import/import.layout';
import { ManageAccountLayout } from '../manage-accounts/manage-accounts.layout';
import { ManageAutoCategoriesLayout } from '../manage-auto-categories/manage-auto-categories.layout';
import { ManageCategoryLayout } from '../manage-categories/manage-categories.layout';
import { SidebarLayout } from '../sidebar/sidebar.layout';
import { IRootLayoutProps } from './root.props.interface';

export const RootLayout = (props: IRootLayoutProps) => {
  React.useEffect(() => {
    props.loadApplication();
  }, []);

  if (props.initializing) {
    // TODO should these be in another component, straight copy from the renderer.html
    // to make sure it keeps the identical positioning, size and color.
    return (
      <div style={{ height: '100%' }}>
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ color: '#234361', fontWeight: 'bold' }}>Fin-Tracker</div>
          <div style={{ color: '#425A70' }}>Loading your data...</div>
        </div>
      </div>
    );
  }

  return (
    <Pane height='100%' display='grid' gridTemplateColumns='auto 1fr' borderTop className='app_fade_in'>
      <SidebarLayout />
      <Pane overflowX='hidden' overflowY='auto' className='scroll-bar-styled'>
        <Switch>
          <Route exact path='/' component={HomeLayout} />
          <Route exact path='/accounts' component={ManageAccountLayout} />
          <Route exact path='/autoCategories' component={ManageAutoCategoriesLayout} />
          <Route exact path='/categories' component={ManageCategoryLayout} />
          <Route exact path='/account/:accountId' component={AccountLayout} />
          <Route exact path='/import/:accountId?' component={ImportLayout} />
        </Switch>
      </Pane>
    </Pane>
  );
};
