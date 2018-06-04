import * as React from 'react';
import { Route, Switch } from 'react-router';
import Sidebar from '../sidebar/sidebar.layout';
import Home from '../home/home.layout';
import NewAccount from '../new-account/new-account.layout';
import './root.layout.scss';

export default class RootLayout extends React.Component {
  render() {
    return (
      <div className="root">
        <Sidebar />
        <div className="main-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/new-account" component={NewAccount} />
          </Switch>
        </div>
        {/* <div>
          <NewMonthly
            filePickerText="New Chequing File"
            newFileSelectedAction={newFileActions.NewScotiabankChequingFileSelected}
            stateSelector={newFileActions.NewScotiabankChequingStateSelector} />
          <NewMonthly
            filePickerText="New Savings File"
            newFileSelectedAction={newFileActions.NewScotiabankSavingsFileSelected}
            stateSelector={newFileActions.NewScotiabankSavingsStateSelector} />
          <NewMonthly
            filePickerText="New Visa File"
            newFileSelectedAction={newFileActions.NewScotiabankVisaFileSelected}
            stateSelector={newFileActions.NewScotiabankVisaStateSelector} />
        </div> */}
      </div>
    );
  }
}
