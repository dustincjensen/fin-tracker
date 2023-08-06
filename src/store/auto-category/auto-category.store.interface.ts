import { IAutoCategory } from './auto-category.interface';

export interface IAutoCategoryStore {
    /**
     * The auto categories that are available to be assigned to records.
     */
    autoCategories: { [accountId: string]: IAutoCategory[] };
}
