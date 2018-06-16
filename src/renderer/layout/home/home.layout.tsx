import * as React from 'react';

// REMOVE BETWEEN
import { IStore } from '../../store/store.interface';
import { connect } from 'react-redux';
import { ByAccountId } from '../../store/records/records.selectors';
import { NewMonthly } from '../new-monthly/new-monthly.layout';
import * as recordsActions from '../../store/records/records.actions';
import * as recordsSelectors from '../../store/records/records.selectors';
import { Dispatch } from 'redux';
import { IAccount } from '../../store/account/account.interface';

const accounts = ({ accounts }) => {
  const items = Object.keys(accounts).map(a => {
    const account: IAccount = accounts[a];

    const newFileAction = (dispatch: Dispatch, filePath: string) => {
      if (account.parseType === "ScotiabankChequing") {
        return recordsActions.NewScotiabankChequingFileSelected(dispatch, a, filePath);
      } else if (account.parseType === "ScotiabankSavings") {
        return recordsActions.NewScotiabankSavingsFileSelected(dispatch, a, filePath);
      } else if (account.parseType === "ScotiabankVisa") {
        return recordsActions.NewScotiabankVisaFileSelected(dispatch, a, filePath);
      }
    };
    const selector = (store: IStore) => {
      return recordsSelectors.ByAccountId(store, a);
    };

    return (
      <div key={a}>
        Name: {accounts[a].name}, Balance: {accounts[a].startingBalance}
        <div>
          <NewMonthly
            filePickerText="New File"
            newFileSelectedAction={newFileAction}
            stateSelector={selector} />
        </div>
      </div>
    );
  })

  return <div>{items}</div>;
};

const mapStateToProps = (state: IStore) => {
  return { accounts: state.accounts };
};

const AccountsContainer = connect(mapStateToProps)(accounts);
// REMOVE BETWEEN

export class HomeLayout extends React.Component {
  render() {
    return (
      <div>
        <AccountsContainer />
      </div>
    );
  }
}
