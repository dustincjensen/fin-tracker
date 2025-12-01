import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AccountSelectors } from '../../store/account/account.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import { accountTypeIcons } from '../../utils/account.utils';
import { formatDateFull } from '../../utils/date.utils';
import { isUpdateNeededForAccount } from './account-summary.utils';

export const useAccountSummary = (accountId: string) => {
    const account = useSelector((state: IStore) => AccountSelectors.account(state, accountId));
    const accountRecords = useSelector((state: IStore) => RecordSelectors.recordsByAccountId(state, accountId));
    const lastRecord = accountRecords?.[accountRecords.length - 1];

    return useMemo(
        () => ({
            balance: lastRecord?.balance,
            dateOfLastTransaction: lastRecord ? formatDateFull(lastRecord.date) : undefined,
            name: account.name,
            icon: accountTypeIcons[account.accountType],
            isUpdateNeeded: isUpdateNeededForAccount(lastRecord?.date),
        }),
        [account.accountType, account.name, lastRecord]
    );
};
