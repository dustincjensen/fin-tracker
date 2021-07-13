import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAccount } from '../../../store/account/account.interface';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { IAutoCategory } from '../../../store/auto-category/auto-category.interface';
import { AutoCategorySelectors } from '../../../store/auto-category/auto-category.selectors';
import { ParseType } from '../../../store/pending-record/parse.type';
import { mapParseType } from '../../../store/pending-record/parse.type.mapper';
import { PendingRecordActions } from '../../../store/pending-record/pending-record.actions';
import { PendingRecordSelectors } from '../../../store/pending-record/pending-record.selectors';
import { IStore } from '../../../store/store.interface';
import { NewRecords } from './new-records.component';
import { INewRecordsProps } from './new-records.props.interface';

type StateProps = Pick<INewRecordsProps, 'accounts' | 'autoCategories' | 'error'>;
type DispatchProps = Pick<INewRecordsProps, 'importAction'>;

const mapStateToProps = (state: IStore): StateProps => ({
  accounts: AccountSelectors.selectActiveBankAccounts(state),
  autoCategories: AutoCategorySelectors.autoCategories(state),
  error: PendingRecordSelectors.error(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    importAction: (account: IAccount, autoCategories: IAutoCategory[], file, parseType: ParseType) => {
      dispatch(PendingRecordActions.clearError());

      const parseAction = mapParseType(parseType);
      return parseAction(dispatch, account.id, file.path, autoCategories, account.accountType);
    },
  };
};

export const NewRecordsContainer = connect(mapStateToProps, mapDispatchToProps)(NewRecords);
