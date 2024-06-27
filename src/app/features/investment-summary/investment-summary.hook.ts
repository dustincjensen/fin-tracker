import { useSelector } from 'react-redux';
import { useInvestmentRecords } from '../../hooks/investment-records/use-investment-records.hook';
import { AccountSelectors } from '../../store/account/account.selectors';
import { IStore } from '../../store/store.interface';
import { accountTypeIcons } from '../../utils/account.utils';
import { getLatestDate, formatDateFull } from '../../utils/date.utils';
import { useBalanceByRate } from '../investment/_hooks/use-balance-by-rate.hook';

export const useInvestmentSummary = (accountId: string) => {
    const { name, accountType } = useSelector((state: IStore) => AccountSelectors.account(state, accountId));
    const icon = accountTypeIcons[accountType];

    const cadLatest = useInvestmentRecords(accountId, 'CAD')?.[0];
    const usdLatest = useInvestmentRecords(accountId, 'USD')?.[0];
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
