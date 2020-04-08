import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AutoCategoryActions } from '../../store/auto-category/auto-category.actions';
import { IAutoCategory } from "../../store/auto-category/auto-category.interface";
import { IStore } from "../../store/store.interface";
import { AutoCategories } from "./auto-categories.component";
import { IAutoCategoriesStateProps, IAutoCategoriesOwnProps, IAutoCategoriesDispatchProps } from "./auto-categories.props.interface";

const mapStateToProps = (state: IStore, ownProps: IAutoCategoriesOwnProps): IAutoCategoriesStateProps => {
  const categories = Object.keys(state.categories.categories)
    .map(id => {
      const category = state.categories.categories[id];
      return {
        label: category.name,
        color: category.color,
        value: category.id,
      };
    });

  const accounts = Object.keys(state.accounts.accounts)
    .map(id => {
      const account = state.accounts.accounts[id];
      return {
        id,
        accountName: account.name
      };
    });

  const records = Object.keys(state.records.records)
    .map(accountId => {
      return {
        accountId,
        records: state.records.records[accountId]
      };
    });

  const autoCategories = Object.keys(state.autoCategories.autoCategories)
    .map(key => [...state.autoCategories.autoCategories[key]].sort((ac1: IAutoCategory, ac2: IAutoCategory) => {
      const ac1Description = ac1.description.toLowerCase();
      const ac2Description = ac2.description.toLowerCase();
      return ac1Description < ac2Description ? -1 : ac1Description > ac2Description ? 1 : 0;
    }))
    .flatMap(ac => ac)
    .map(ac => {
      const account = accounts.find(a => a.id === ac?.accountId);
      return {
        ...ac,
        category: categories.find(c => c.value === ac.categoryId),
        accountName: account?.accountName,
        numberOfRecords: records.filter(r => r.accountId === account.id)?.[0].records?.filter(r => r.autoCategoryId === ac.id).length
      };
    });

  const { autoCategoryFilter } = ownProps;
  const filteredAutoCategories = 
    autoCategoryFilter && autoCategoryFilter.length > 0
      ? autoCategories.filter(a => a.description.toLowerCase().indexOf(autoCategoryFilter.toLowerCase()) >= 0)
      : autoCategories;

  return {
    autoCategories: filteredAutoCategories
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IAutoCategoriesDispatchProps => ({
  deleteAutoCategory: (autoCategory: IAutoCategory) => dispatch(AutoCategoryActions.deleteAutoCategory(autoCategory))
});

export const AutoCategoriesContainer = connect(mapStateToProps, mapDispatchToProps)(AutoCategories);