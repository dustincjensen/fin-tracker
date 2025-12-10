import React from 'react';
import { useSelector } from 'react-redux';
import { useCategories } from '../../hooks/categories/use-categories.hook';
import { SplitRecord } from '../../models/split-record.type';
import { AutoCategorySelectors } from '../../store/auto-category/auto-category.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { createDate, IDate, withinFiveDays } from '../../utils/date.utils';

export type MatchingRecord = {
    date: IDate;
    id: string;
    accountId: string;
    description: string;
    details?: string;
    splitRecords?: SplitRecord[];
    categoryId?: string;
    autoCategoryId?: string;
    debit?: number;
    credit?: number;
    balance?: number;
    isManualEntry?: boolean;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useFindPaymentRecord = (payment: any) => {
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

    let matchingRecord = null;

    if (payment) {
        matchingRecord = recordsThatMatchCategory.find(
            r => withinFiveDays(r.date, payment.date) && r.debit === payment.paymentAmount
        );
    }

    return { matchingRecord };
};
