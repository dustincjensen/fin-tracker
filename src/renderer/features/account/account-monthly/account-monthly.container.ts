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
type OwnProps = Pick<IAccountMonthlyProps, 'accountId' | 'date' | 'filterDescription' | 'filterCategoryId'>;

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

  // Filter category 
  let filteredRecords = ownProps.filterCategoryId
    ? ownProps.filterCategoryId === 'Uncategorized' 
      ? records.filter(r => (r.splitRecords === undefined && !r.categoryId) || (r.splitRecords?.some(sr => !sr.categoryId)))
      : records.filter(r => r.categoryId === ownProps.filterCategoryId || r.splitRecords?.some(sr => sr.categoryId === ownProps.filterCategoryId))
    : records;
  
  // Filter description
  const lowercaseFilter = ownProps.filterDescription?.toLowerCase();
  filteredRecords = lowercaseFilter
    ? filteredRecords.filter(r => r.description.toLowerCase().indexOf(lowercaseFilter) >= 0 ||
                                  r.details?.toLowerCase().indexOf(lowercaseFilter) >= 0 ||
                                  r.splitRecords?.some(sr =>sr.description.toLowerCase().indexOf(lowercaseFilter) >= 0))
    : filteredRecords;

  return {
    records: filteredRecords,
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
