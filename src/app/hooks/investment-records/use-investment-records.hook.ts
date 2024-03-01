import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { InvestmentRecordSelectors } from '../../store/investment-record/investment-record.selectors';
import { IStore } from '../../store/store.interface';
import { sortByDateDescending } from '../../utils/record.utils';

/**
 * Returns an array of sorted investment records by currency.
 *
 * @param accountId The ID of the account.
 * @param currency The investment currency.
 */
export const useInvestmentRecords = (accountId: string, currency: string) => {
    const investmentRecords = useSelector((state: IStore) =>
        InvestmentRecordSelectors.recordsByAccountId(state, accountId)
    );

    return useMemo(
        () => investmentRecords?.filter(r => r.investmentCurrency === currency).sort(sortByDateDescending) || [],
        [currency, investmentRecords]
    );
};
