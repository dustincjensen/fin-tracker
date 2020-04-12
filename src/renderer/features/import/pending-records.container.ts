import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PendingRecordActions } from '../../store/pending-record/pending-record.actions';
import { IStore } from '../../store/store.interface';
import { PendingRecords } from './pending-records.component';
import { IPendingRecordsStateProps, IPendingRecordsDispatchProps } from './pending-records.props.interface';

const mapStateToProps = (state: IStore): IPendingRecordsStateProps => {
  const categories = Object.keys(state.categories.categories)
    .map(id => {
      const category = state.categories.categories[id];
      return {
        label: category.name,
        color: category.color,
        value: category.id,
      };
    })
    .sort((c1, c2) => {
      const c1Label = c1.label.toLowerCase();
      const c2Label = c2.label.toLowerCase();
      return c1Label < c2Label ? -1 : c1Label > c2Label ? 1 : 0;
    });

  const records = state.pendingRecords.records?.map(record => {
    return {
      ...record,
      category: categories.find(c => c.value === record.categoryId),
      splitRecords: undefined
    };
  });

  return {
    categories,
    records,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IPendingRecordsDispatchProps => {
  return {
    // deletePendingRecord: (recordId: string) => dispatch(PendingRecordActions.deletePendingRecord(recordId)),
    updatePendingRecordCategory: (recordId: string, categoryId: string) => dispatch(PendingRecordActions.updatePendingRecordCategory(recordId, categoryId))
  };
};

export const PendingRecordsContainer = connect(mapStateToProps, mapDispatchToProps)(PendingRecords);
