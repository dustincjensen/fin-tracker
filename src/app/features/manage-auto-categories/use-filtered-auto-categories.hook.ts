import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAccounts } from '../../hooks/accounts/use-accounts.hook';
import { useCategories } from '../../hooks/categories/use-categories.hook';
import { AutoCategory } from '../../models/auto-category.type';
import { Category } from '../../models/category.type';
import { AutoCategorySelectors } from '../../store/auto-category/auto-category.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';

type MappedAutoCategory = {
    accountId: string;
    accountName: string;
    accountArchived: boolean;
    category: Category;
    categoryId: string;
    description: string;
    id: string;
    numberOfRecords: number;
};

const useAutoCategories = () => {
    const { categories } = useCategories();
    const { accounts } = useAccounts();
    const records = useSelector(RecordSelectors.records);
    const autoCategories = useSelector(AutoCategorySelectors.autoCategories);

    const mappedAutoCategories: Array<MappedAutoCategory> = useMemo(() => {
        return Object.keys(autoCategories)
            .map(key =>
                [...autoCategories[key]].sort((ac1: AutoCategory, ac2: AutoCategory) => {
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

                const mappedAutoCategory: MappedAutoCategory = {
                    ...ac,
                    category: categories.find(c => c.id === ac.categoryId) as Category,
                    accountName: account.name,
                    accountArchived: !!account.archived,
                    numberOfRecords: records[account.id]?.filter(r => r.autoCategoryId === ac.id).length,
                };
                return mappedAutoCategory;
            })
            .filter((ac): ac is MappedAutoCategory => !!ac);
    }, [accounts, autoCategories, categories, records]);

    return {
        autoCategories: mappedAutoCategories,
    };
};

export const useFilteredAutoCategories = (autoCategoryFilter: string, showArchived: boolean) => {
    const { autoCategories } = useAutoCategories();

    return {
        filteredAutoCategories: useMemo(() => {
            let filteredAutoCategories =
                autoCategoryFilter?.length > 0
                    ? autoCategories.filter(
                          a => a.description.toLowerCase().indexOf(autoCategoryFilter.toLowerCase()) >= 0
                      )
                    : autoCategories;

            filteredAutoCategories = showArchived
                ? filteredAutoCategories
                : filteredAutoCategories.filter(a => !a.accountArchived);

            return filteredAutoCategories;
        }, [autoCategories, autoCategoryFilter, showArchived]),
    };
};
