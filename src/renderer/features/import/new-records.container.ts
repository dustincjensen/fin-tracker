import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAccount } from '../../store/account/account.interface';
import { IAutoCategory } from '../../store/auto-category/auto-category.interface';
import { ParseType } from '../../store/pending-record/parse.type';
import { mapParseType } from '../../store/pending-record/parse.type.mapper';
import { PendingRecordActions } from '../../store/pending-record/pending-record.actions';
import { IStore } from '../../store/store.interface';
import { NewRecords } from './new-records.component';
import { INewRecordsStateProps, INewRecordsDispatchProps } from './new-records.props.interface';

const mapStateToProps = (state: IStore): INewRecordsStateProps => {
  return {
    accounts: Object.keys(state.accounts.accounts).map(accountId => {
      return state.accounts.accounts[accountId];
    }),
    autoCategories: state.autoCategories.autoCategories,
    error: state.pendingRecords.error,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): INewRecordsDispatchProps => {
  return {
    importAction: (account: IAccount, autoCategories: IAutoCategory[], file, parseType: ParseType) => {
      dispatch(PendingRecordActions.clearError());

      const parseAction = mapParseType(parseType);
      return parseAction(dispatch, account.id, file.path, autoCategories, account.accountType);
    },
  };
};

export const NewRecordsContainer = connect(mapStateToProps, mapDispatchToProps)(NewRecords);
