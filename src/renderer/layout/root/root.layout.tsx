import * as React from 'react';
import NewMonthly from '../new-monthly/new-monthly.layout';
import Sidebar from '../sidebar/sidebar.layout';
import * as newFileActions from '../../store/new-file/new-file.actions';
import './root.layout.scss';

export default class RootLayout extends React.Component {
  render() {
    return (
      <div className="root">
        <Sidebar />
        <div>
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
        </div>
      </div>
    );
  }
}
