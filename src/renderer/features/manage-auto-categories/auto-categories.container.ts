import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';
import { AccountSelectors } from '../../store/account/account.selectors';
import { AutoCategoryActions } from '../../store/auto-category/auto-category.actions';
import { IAutoCategory } from '../../store/auto-category/auto-category.interface';
import { AutoCategorySelectors } from '../../store/auto-category/auto-category.selectors';
import { CategorySelectors } from '../../store/category/category.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import { AutoCategories } from './auto-categories.component';
import {
  IAutoCategoriesStateProps,
  IAutoCategoriesOwnProps,
  IAutoCategoriesDispatchProps,
} from './auto-categories.props.interface';

const autoCategorySelector = createSelector(
  CategorySelectors.selectCategories,
  AccountSelectors.selectAccountNames,
  RecordSelectors.records,
  AutoCategorySelectors.autoCategories,
  (categories, accounts, records, autoCategories) => {
    const mappedAutoCategories = Object.keys(autoCategories)
      .map(key =>
        [...autoCategories[key]].sort((ac1: IAutoCategory, ac2: IAutoCategory) => {
          const ac1Description = ac1.description.toLowerCase();
          const ac2Description = ac2.description.toLowerCase();
          return ac1Description < ac2Description ? -1 : ac1Description > ac2Description ? 1 : 0;
        })
      )
      .flatMap(ac => ac)
      .map(ac => {
        const account = accounts.find(a => a.id === ac?.accountId);
        if (!account) {
          return undefined;
        }

        return {
          ...ac,
          category: categories.find(c => c.id === ac.categoryId),
          accountName: account.accountName,
          numberOfRecords: records[account.id]?.filter(r => r.autoCategoryId === ac.id).length,
        };
      })
      .filter(ac => ac);

    return mappedAutoCategories;
  }
);

const mapStateToProps = (state: IStore, ownProps: IAutoCategoriesOwnProps): IAutoCategoriesStateProps => {
  const { autoCategoryFilter } = ownProps;
  const autoCategories = autoCategorySelector(state);
  const filteredAutoCategories =
    autoCategoryFilter && autoCategoryFilter.length > 0
      ? autoCategories.filter(a => a.description.toLowerCase().indexOf(autoCategoryFilter.toLowerCase()) >= 0)
      : autoCategories;
  return {
    autoCategories: filteredAutoCategories,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IAutoCategoriesDispatchProps => ({
  deleteAutoCategory: (autoCategory: IAutoCategory) => dispatch(AutoCategoryActions.deleteAutoCategory(autoCategory)),
});

export const AutoCategoriesContainer = connect(mapStateToProps, mapDispatchToProps)(AutoCategories);
