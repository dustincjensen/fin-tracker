import { useSelector } from 'react-redux';
import { useDisplayCategories } from '../../../hooks/categories/use-display-categories.hook';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { AutoCategorySelectors } from '../../../store/auto-category/auto-category.selectors';
import { RecordSelectors } from '../../../store/record/record.selectors';

export const useInstructions = () => {
    const hasAccounts = Object.keys(useSelector(AccountSelectors.accounts)).length > 0;

    const records = useSelector(RecordSelectors.records);
    const atLeastOneAccountHasRecords = Object.keys(records).some(key => records[key]?.length > 0);

    const { categories } = useDisplayCategories();
    const hasCategories = categories.length > 0;

    const autoCategories = useSelector(AutoCategorySelectors.autoCategories);
    const hasAutoCategories = Object.keys(autoCategories).some(key => autoCategories[key].length > 0);

    const hasSplitRecords = Object.keys(records).some(key => records[key].some(r => r.splitRecords?.length > 0));

    return {
        hasAccounts,
        atLeastOneAccountHasRecords,
        hasCategories,
        hasAutoCategories,
        hasSplitRecords,
    };
};
