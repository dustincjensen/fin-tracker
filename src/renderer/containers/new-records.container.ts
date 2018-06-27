import { connect, Dispatch } from 'react-redux';
import { NewRecords, INewRecordsStateProps, INewRecordsDispatchProps } from '../components/new-records/new-records.component';
import { IStore } from '../store/store.interface';
import { IAccount } from '../store/account/account.interface';
import { mapParseType } from '../store/account/parse.type.mapper';
import { IRecord } from '../store/records/record.interface';

const mapStateToProps = (store: IStore): INewRecordsStateProps => {
  return {
    accounts: Object.keys(store.accounts).map(accountId => {
      return store.accounts[accountId];
    }),
    records: store.records
  }
};

const mapDispatchToProps = (dispatch: Dispatch): INewRecordsDispatchProps => {
  return {
    uploadAction: (account: IAccount, records: IRecord[], file: any) => {
      const parseAction = mapParseType(account.parseType);
      return parseAction(dispatch, account.id, file.path, account.startingBalance, records);
    }
  }
};

export const NewRecordsContainer = connect(mapStateToProps, mapDispatchToProps)(NewRecords);
