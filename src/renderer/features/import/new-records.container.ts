import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAccount } from '../../store/account/account.interface';
import { ParseType } from '../../store/pending-record/parse.type';
import { mapParseType } from '../../store/pending-record/parse.type.mapper';
import { IStore } from '../../store/store.interface';
import { NewRecords } from './new-records.component';
import { INewRecordsStateProps, INewRecordsDispatchProps } from './new-records.props.interface';

const mapStateToProps = (state: IStore): INewRecordsStateProps => {
  return {
    accounts: Object.keys(state.accounts.accounts).map(accountId => {
      return state.accounts.accounts[accountId];
    }),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): INewRecordsDispatchProps => {
  return {
    importAction: (account: IAccount, file, parseType: ParseType) => {
      const parseAction = mapParseType(parseType);
      return parseAction(dispatch, account.id, file.path, account.accountType);
    },
  };
};

export const NewRecordsContainer = connect(mapStateToProps, mapDispatchToProps)(NewRecords);
