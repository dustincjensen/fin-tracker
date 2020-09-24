import { ICategory } from '../../../store/category/category.interface';

export interface ICombinedCategorySummaryProps {
  categories: ICategory[];
  categoryTotalsByMonth: Array<{
    date: string;
    categoryBalances: { [id: string]: number };
  }>;
}
