import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { AccountSelectors } from '../../store/account/account.selectors';
import { InvestmentRecordSelectors } from '../../store/investment-record/investment-record.selectors';
import { IStore } from '../../store/store.interface';
import { accountTypeIcons } from '../../utils/account.utils';
import { getLatestDate, formatDateFull } from '../../utils/date.utils';
import { sortByDateDescending } from '../../utils/record.utils';
import { useBalanceByRate } from '../investment/_hooks/use-balance-by-rate.hook';

const latestBalanceSelector = createSelector(
    InvestmentRecordSelectors.records,
    (_state: IStore, accountId: string) => accountId,
    (_state: IStore, _accountId: string, currency: string) => currency,
    (records, accountId, currency) =>
        records[accountId]?.filter(r => r.investmentCurrency === currency).sort(sortByDateDescending)[0] || undefined
);

export const useInvestmentSummary = (accountId: string) => {
    const { name, accountType } = useSelector((state: IStore) => AccountSelectors.account(state, accountId));
    const icon = accountTypeIcons[accountType];

    const cadLatest = useSelector((state: IStore) => latestBalanceSelector(state, accountId, 'CAD'));
    const usdLatest = useSelector((state: IStore) => latestBalanceSelector(state, accountId, 'USD'));
    const { convertedBalance: usdConverted } = useBalanceByRate(
        usdLatest?.balance,
        usdLatest?.date,
        usdLatest?.investmentCurrency
    );

    const latestDate = formatDateFull(getLatestDate([cadLatest?.date, usdLatest?.date]));
    const hasBalance = !!cadLatest?.balance || !!usdConverted;
    const balance = (cadLatest?.balance || 0.0) + (usdConverted || 0.0);

    return { name, icon, latestDate, balance: hasBalance ? balance : undefined };
};
