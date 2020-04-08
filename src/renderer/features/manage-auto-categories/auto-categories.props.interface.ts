import { IAutoCategory } from "../../store/auto-category/auto-category.interface";

export interface IAutoCategoriesProps extends IAutoCategoriesStateProps, IAutoCategoriesDispatchProps, IAutoCategoriesOwnProps {}

export interface IAutoCategoriesStateProps {
  /**
   * The auto categories to display.
   */
  autoCategories: Array<IAutoCategory & { 
    category: {
      color: string;
      label: string;
      value: string;
    };

    accountName: string;

    numberOfRecords: number;
  }>;
}

export interface IAutoCategoriesDispatchProps {
  /**
   * Action to delete an automatic category.
   */
  deleteAutoCategory: (autoCategory: IAutoCategory) => void;
}

export interface IAutoCategoriesOwnProps {
  /**
   * The auto category filter.
   */
  autoCategoryFilter: string;
}