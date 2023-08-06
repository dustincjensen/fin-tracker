import { Category } from '../../../models/category.type';

export interface ICombinedCategorySummaryProps {
    categories: Category[];
    categoryTotalsByMonth: Array<{
        date: string;
        categoryBalances: { [id: string]: number };
    }>;
}
