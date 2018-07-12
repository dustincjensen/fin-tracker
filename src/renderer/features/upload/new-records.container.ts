import { connect, Dispatch } from 'react-redux';
import { NewRecords, INewRecordsStateProps, INewRecordsDispatchProps } from './new-records.component';
import { IStore } from '../../store/store.interface';
import { IAccount } from '../../store/account/account.interface';
import { mapParseType } from '../../store/pending-records/parse.type.mapper';

const mapStateToProps = (store: IStore): INewRecordsStateProps => {
  return {
    accounts: Object.keys(store.accounts).map(accountId => {
      return store.accounts[accountId];
    })
  };
};

const mapDispatchToProps = (dispatch: Dispatch): INewRecordsDispatchProps => {
  return {
    uploadAction: (account: IAccount, file: any) => {
      const parseAction = mapParseType(account.parseType);
      return parseAction(dispatch, account.id, file.path);
    }
  }
};

export const NewRecordsContainer = connect(mapStateToProps, mapDispatchToProps)(NewRecords);
