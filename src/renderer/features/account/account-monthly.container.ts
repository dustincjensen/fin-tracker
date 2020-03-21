import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RecordActions } from '../../store/record/record.actions';
import { IStore } from '../../store/store.interface';
import { AccountMonthly } from './account-monthly.component';
import { IAccountMonthlyOwnProps, IAccountMonthlyStateProps } from './account-monthly.props.interface';

const mapStateToProps = (state: IStore, ownProps: IAccountMonthlyOwnProps): IAccountMonthlyStateProps => {
  const categories = Object.keys(state.categories.categories).map(id => {
    return state.categories.categories[id];
  });

  const records = ownProps.stateSelector(state, ownProps.accountId, ownProps.date).map(r => {
    return {
      ...r,
      category: categories.find(c => c.id === r.categoryId),
    };
  });

  return {
    records,
    categories,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IAccountMonthlyOwnProps) => {
  const { accountId } = ownProps;
  return {
    updateCategory: (recordId: string, categoryId: string) =>
      dispatch(RecordActions.setRecordCategory(accountId, recordId, categoryId)),
  };
};

export const AccountMonthlyContainer = connect(mapStateToProps, mapDispatchToProps)(AccountMonthly);
