import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CategorySelectors } from '../../../store/category/category.selectors';
import { RecordActions } from '../../../store/record/record.actions';
import { ISplitRecord } from '../../../store/record/split-record.interface';
import { IStore } from '../../../store/store.interface';
import { AccountMonthly } from './account-monthly.component';
import { IAccountMonthlyProps } from './account-monthly.props.interface';

type StateProps = Pick<IAccountMonthlyProps, 'records' | 'categories'>;
type DispatchProps = Pick<
  IAccountMonthlyProps,
  'updateCategory' | 'updateRecordWithSplits' | 'updateSplitRecordCategory'
>;
type OwnProps = Pick<IAccountMonthlyProps, 'accountId' | 'date' | 'stateSelector'>;

const mapStateToProps = (state: IStore, ownProps: OwnProps): StateProps => {
  const { stateSelector, accountId, date } = ownProps;
  const categories = CategorySelectors.selectCategories(state);

  const records = stateSelector(state, accountId, date)?.map(record => {
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

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => {
  const { accountId } = ownProps;
  return {
    updateCategory: (recordId: string, categoryId: string) =>
      dispatch(RecordActions.setRecordCategory(accountId, recordId, categoryId)),
    updateSplitRecordCategory: (recordId: string, splitRecordId: string, categoryId: string) =>
      dispatch(RecordActions.setSplitRecordCategory(accountId, recordId, splitRecordId, categoryId)),
    updateRecordWithSplits: (recordId: string, splitRecords: ISplitRecord[]) =>
      dispatch(RecordActions.setSplitRecords(accountId, recordId, splitRecords)),
  };
};

export const AccountMonthlyContainer = connect(mapStateToProps, mapDispatchToProps)(AccountMonthly);
