import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CategorySelectors } from '../../../store/category/category.selectors';
import { RecordActions } from '../../../store/record/record.actions';
import { IRecord } from '../../../store/record/record.interface';
import { ISplitRecord } from '../../../store/record/split-record.interface';
import { IStore } from '../../../store/store.interface';
import { AccountMonthly } from './account-monthly.component';
import {
  IAccountMonthlyOwnProps,
  IAccountMonthlyStateProps,
  IAccountMonthlyDispatchProps,
} from './account-monthly.props.interface';

const mapStateToProps = (state: IStore, ownProps: IAccountMonthlyOwnProps): IAccountMonthlyStateProps => {
  const categories = CategorySelectors.selectCategories(state);

  const records = ownProps.stateSelector(state, ownProps.accountId, ownProps.date)?.map(record => {
    return {
      ...record,
      category: categories.find(c => c.id === record.categoryId),
      splitRecords: record.splitRecords?.map(splitRecord => {
        return {
          ...splitRecord,
          category: categories.find(c => c.id === splitRecord.categoryId),
        };
      }),
    };
  });

  return {
    records,
    categories,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IAccountMonthlyOwnProps): IAccountMonthlyDispatchProps => {
  const { accountId } = ownProps;
  return {
    updateCategory: (recordId: string, categoryId: string) =>
      dispatch(RecordActions.setRecordCategory(accountId, recordId, categoryId)),
    updateSplitRecordCategory: (recordId: string, splitRecordId: string, categoryId: string) =>
      dispatch(RecordActions.setSplitRecordCategory(accountId, recordId, splitRecordId, categoryId)),
    updateRecordWithSplits: (recordId: string, splitRecords: ISplitRecord[]) =>
      dispatch(RecordActions.setSplitRecords(accountId, recordId, splitRecords)),
    deleteRecordSplitRecords: (record: IRecord) => dispatch(RecordActions.deleteSplitRecords(accountId, record.id)),
    autoCategorizeRecords: (
      autoCategoryId: string,
      categoryId: string,
      description: string,
      overWriteExisting: boolean
    ) =>
      dispatch(
        RecordActions.setRecordsAutoCategory(accountId, autoCategoryId, categoryId, description, overWriteExisting)
      ),
  };
};

export const AccountMonthlyContainer = connect(mapStateToProps, mapDispatchToProps)(AccountMonthly);
