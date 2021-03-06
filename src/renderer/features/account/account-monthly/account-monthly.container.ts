import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CategorySelectors } from '../../../store/category/category.selectors';
import { RecordActions } from '../../../store/record/record.actions';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { AccountMonthly } from './account-monthly.component';
import { IAccountMonthlyProps } from './account-monthly.props.interface';

type StateProps = Pick<IAccountMonthlyProps, 'records' | 'categories'>;
type DispatchProps = Pick<IAccountMonthlyProps, 'updateCategory' | 'updateSplitRecordCategory'>;
type OwnProps = Pick<IAccountMonthlyProps, 'accountId' | 'date'>;

const mapStateToProps = (state: IStore, ownProps: OwnProps): StateProps => {
  const { accountId, date } = ownProps;
  const categories = CategorySelectors.selectCategories(state);

  const records = RecordSelectors.recordsByDate(state, accountId, date)?.map(record => {
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
  };
};

export const AccountMonthlyContainer = connect(mapStateToProps, mapDispatchToProps)(AccountMonthly);
