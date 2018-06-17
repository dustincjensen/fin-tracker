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
import { IRecord } from '../../store/records/record.interface';

const accounts = ({ accounts, records }) => {
  const items = Object.keys(accounts).map(accountId => {
    const account: IAccount = accounts[accountId];
    const recordsForAccount: IRecord[] = records.filter(r => r.accountId === accountId);

    const newFileAction = (dispatch: Dispatch, filePath: string) => {
      if (account.parseType === "ScotiabankChequing") {
        return recordsActions.NewScotiabankChequingFileSelected(dispatch, accountId, filePath, account.startingBalance, recordsForAccount);
      } else if (account.parseType === "ScotiabankSavings") {
        return recordsActions.NewScotiabankSavingsFileSelected(dispatch, accountId, filePath, account.startingBalance, recordsForAccount);
      } else if (account.parseType === "ScotiabankVisa") {
        return recordsActions.NewScotiabankVisaFileSelected(dispatch, accountId, filePath, account.startingBalance, recordsForAccount);
      }
    };
    const selector = (store: IStore) => {
      return recordsSelectors.ByAccountId(store, accountId);
    };

    return (
      <div key={accountId}>
        Name: {account.name}, Balance: {account.startingBalance}
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
  return {
    accounts: state.accounts,
    records: state.records
  };
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
