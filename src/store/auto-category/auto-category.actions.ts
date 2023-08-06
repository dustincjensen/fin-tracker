import { IAutoCategory } from './auto-category.interface';

export class AutoCategoryActions {
    public static DELETE_AUTO_CATEGORY = 'DELETE_AUTO_CATEGORY';

    public static deleteAutoCategory = (autoCategory: IAutoCategory) => ({
        type: AutoCategoryActions.DELETE_AUTO_CATEGORY,
        payload: autoCategory,
    });
}
