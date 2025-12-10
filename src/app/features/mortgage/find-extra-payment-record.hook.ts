import React from 'react';
import { useSelector } from 'react-redux';
import { useCategories } from '../../hooks/categories/use-categories.hook';
import { AutoCategorySelectors } from '../../store/auto-category/auto-category.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { createDate } from '../../utils/date.utils';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useFindExtraPaymentRecord = (paymentAmount: any) => {
    const allRecords = useSelector(RecordSelectors.selectAllRecordsAcrossAccounts);
    const category = useCategories().categories.find(c => c.name === 'Rent/Mortgage');
    const autoCategories = useSelector(AutoCategorySelectors.autoCategories);

    const recordsThatMatchCategory = React.useMemo(() => {
        const mappedAutoCategories = Object.keys(autoCategories)
            .map(id => autoCategories[id])
            .reduce((prev, curr) => {
                return [...curr, ...prev];
            }, [])
            .filter(c => c.categoryId === category.id)
            .map(c => c.id);

        return allRecords
            .filter(r => r.categoryId === category.id || mappedAutoCategories.indexOf(r.autoCategoryId) >= 0)
            .map(r => {
                return {
                    ...r,
                    date: createDate(r.date),
                };
            });
    }, [allRecords, category, autoCategories]);

    // TODO allow full filtering
    // TODO filter out records that have been selected already.
    return { matchingRecords: recordsThatMatchCategory.filter(r => r.debit > paymentAmount) };
};
