import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recordsByDate } from '../../hooks/records/use-records-by-date.hook';
import { Category } from '../../models/category.type';
import { setRecordCategory, setSplitRecordCategory } from '../../store/record/record-slice';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';

/**
 * Returns a set of records filtered by category and description with the categories attached.
 *
 * @param accountId The ID of the account.
 * @param date The current month and year to show records for.
 * @param categories The categories to add to the records.
 * @param filterCategoryId The category currently being filtered on.
 * @param filterDescription The description currently being filtered on.
 */
export const useAccountMonthly = (
    accountId: string,
    date: string,
    categories: Category[],
    filterCategoryId: string,
    filterDescription: string
) => {
    const records = useSelector((state: IStore) => RecordSelectors.recordsByAccountId(state, accountId));

    // Add the category to the record and split records.
    const enhancedRecords = useMemo(
        () =>
            recordsByDate(records, date)?.map(r => ({
                ...r,
                category: categories.find(c => c.id === r.categoryId),
                splitRecords: r.splitRecords?.map(splitRecord => ({
                    ...splitRecord,
                    category: categories.find(c => c.id === splitRecord.categoryId),
                })),
            })),
        [date, records, categories]
    );

    return useMemo(() => {
        let filteredRecords = enhancedRecords;

        // Filter category
        if (filterCategoryId) {
            filteredRecords =
                filterCategoryId === 'Uncategorized'
                    ? enhancedRecords.filter(
                          r =>
                              (r.splitRecords === undefined && !r.category) ||
                              r.splitRecords?.some(sr => !sr.categoryId)
                      )
                    : enhancedRecords.filter(
                          r =>
                              r.category?.id === filterCategoryId ||
                              r.categoryId === filterCategoryId ||
                              r.splitRecords?.some(sr => sr.categoryId === filterCategoryId)
                      );
        }

        // Filter description
        const lowercaseFilter = filterDescription?.toLowerCase();
        if (lowercaseFilter) {
            filteredRecords = filteredRecords.filter(
                r =>
                    r.description.toLowerCase().indexOf(lowercaseFilter) >= 0 ||
                    r.details?.toLowerCase().indexOf(lowercaseFilter) >= 0 ||
                    r.splitRecords?.some(sr => sr.description.toLowerCase().indexOf(lowercaseFilter) >= 0)
            );
        }

        return filteredRecords;
    }, [filterCategoryId, filterDescription, enhancedRecords]);
};

/**
 * Returns actions to use in the account.
 *
 * @param accountId The ID of the account.
 */
export const useAccountMonthlyActions = (accountId: string) => {
    const dispatch = useDispatch();

    const updateCategory = useCallback(
        (recordId: string, categoryId: string) => dispatch(setRecordCategory({ accountId, recordId, categoryId })),
        [accountId, dispatch]
    );

    const updateSplitRecordCategory = useCallback(
        (recordId: string, splitRecordId: string, categoryId: string) =>
            dispatch(setSplitRecordCategory({ accountId, recordId, splitRecordId, categoryId })),
        [accountId, dispatch]
    );

    return {
        updateCategory,
        updateSplitRecordCategory,
    };
};
