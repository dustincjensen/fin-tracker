import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAccount } from '../../store/account/account.interface';
import { mapParseType } from '../../store/pending-record/parse.type.mapper';
import { IStore } from '../../store/store.interface';
import { INewRecordsDispatchProps, INewRecordsStateProps, NewRecords } from './new-records.component';

const mapStateToProps = (state: IStore): INewRecordsStateProps => {
  return {
    accounts: Object.keys(state.accounts.accounts).map(accountId => {
      return state.accounts.accounts[accountId];
    }),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): INewRecordsDispatchProps => {
  return {
    importAction: (account: IAccount, file) => {
      const parseAction = mapParseType(account.parseType);
      return parseAction(dispatch, account.id, file.path);
    },
  };
};

export const NewRecordsContainer = connect(mapStateToProps, mapDispatchToProps)(NewRecords);
