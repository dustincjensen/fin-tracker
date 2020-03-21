import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RecordActions } from '../../store/record/record.actions';
import { IStore } from '../../store/store.interface';
import { AccountMonthly } from './account-monthly.component';
import { IAccountMonthlyOwnProps, IAccountMonthlyStateProps } from './account-monthly.props.interface';

const mapStateToProps = (state: IStore, ownProps: IAccountMonthlyOwnProps): IAccountMonthlyStateProps => {
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
      return c1.label < c2.label ? -1 : c1.label > c2.label ? 1 : 0;
    });

  const records = ownProps.stateSelector(state, ownProps.accountId, ownProps.date).map(r => {
    return {
      ...r,
      category: categories.find(c => c.value === r.categoryId),
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
