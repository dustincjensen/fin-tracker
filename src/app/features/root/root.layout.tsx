import { Pane, ThemeProvider, classicTheme, defaultTheme } from 'evergreen-ui';
import React from 'react';
import { Route, Switch } from 'react-router';
import { useLocalStorage } from '../../hooks/use-local-storage.hook';
import { AccountLayout } from '../account/account.layout';
import { HomeLayout } from '../home/home.layout';
import { ImportLayout } from '../import/import.layout';
import { InvestmentLayout } from '../investment/investment.layout';
import { ManageAccountLayout } from '../manage-accounts/manage-accounts.layout';
import { ManageAutoCategoriesLayout } from '../manage-auto-categories/manage-auto-categories.layout';
import { ManageCategoryLayout } from '../manage-categories/manage-categories.layout';
import { ManageThirdPartyApisLayout } from '../manage-third-party-apis/manage-third-party-apis.layout';
import { SidebarLayout } from '../sidebar/sidebar.layout';

const newThemeOption = 'newThemeOption';

export const RootLayout = () => {
    const [newTheme, setNewTheme] = useLocalStorage<boolean>(newThemeOption, false);
    return (
        <ThemeProvider value={newTheme ? defaultTheme : classicTheme}>
            <Pane height='100%' display='grid' gridTemplateColumns='auto 1fr' borderTop className='app_fade_in'>
                <SidebarLayout theme={newTheme} toggleTheme={setNewTheme} />
                <Pane overflowX='hidden' overflowY='auto' className='scroll-bar-styled'>
                    <Switch>
                        <Route exact path='/' component={HomeLayout} />
                        <Route exact path='/accounts' component={ManageAccountLayout} />
                        <Route exact path='/autoCategories' component={ManageAutoCategoriesLayout} />
                        <Route exact path='/categories' component={ManageCategoryLayout} />
                        <Route exact path='/account/:accountId' component={AccountLayout} />
                        <Route exact path='/investment/:accountId' component={InvestmentLayout} />
                        <Route exact path='/import/:accountId?' component={ImportLayout} />
                        <Route exact path='/thirdPartyApis' component={ManageThirdPartyApisLayout} />
                    </Switch>
                </Pane>
            </Pane>
        </ThemeProvider>
    );
};
