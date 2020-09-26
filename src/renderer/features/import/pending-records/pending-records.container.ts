import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';
import { CategorySelectors } from '../../../store/category/category.selectors';
import { PendingRecordActions } from '../../../store/pending-record/pending-record.actions';
import { PendingRecordSelectors } from '../../../store/pending-record/pending-record.selectors';
import { IStore } from '../../../store/store.interface';
import { PendingRecords } from './pending-records.component';
import { IPendingRecordsProps } from './pending-records.props.interface';

type StateProps = Pick<IPendingRecordsProps, 'categories' | 'records'>;
type DispatchProps = Pick<IPendingRecordsProps, 'updatePendingRecordCategory'>;

const recordSelector = createSelector(
  PendingRecordSelectors.records,
  CategorySelectors.selectCategories,
  (records, categories) =>
    records?.map(record => {
      return {
        ...record,
        category: categories.find(c => c.id === record.categoryId),
        splitRecords: undefined,
      };
    })
);

const mapStateToProps = (state: IStore): StateProps => ({
  categories: CategorySelectors.selectCategories(state),
  records: recordSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    // deletePendingRecord: (recordId: string) => dispatch(PendingRecordActions.deletePendingRecord(recordId)),
    updatePendingRecordCategory: (recordId: string, categoryId: string) =>
      dispatch(PendingRecordActions.updatePendingRecordCategory(recordId, categoryId)),
  };
};

export const PendingRecordsContainer = connect(mapStateToProps, mapDispatchToProps)(PendingRecords);
