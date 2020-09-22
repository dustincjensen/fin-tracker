import { ICategory } from '../../store/category/category.interface';

export interface ICombinedCategorySummaryProps extends ICombinedCategorySummaryStateProps {}

export interface ICombinedCategorySummaryStateProps {
  categories: ICategory[];
  categoryTotalsByMonth: Array<{
    date: string;
    categoryBalances: { [id: string]: number };
  }>;
}
