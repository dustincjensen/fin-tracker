import { Heading, Pane } from 'evergreen-ui';
import React from 'react';
import { useActiveAccounts } from '../../../hooks/accounts/use-active-accounts.hook';
import { isBankAccount, isInvestmentAccount } from '../../../utils/account.utils';
import { AccountSummary } from '../../account-summary/account-summary.component';
import { InvestmentSummary } from '../../account-summary/investment-summary.component';

export const AccountSummaries = () => {
    const { activeAccounts: accounts } = useActiveAccounts();

    const bankAccounts = accounts.filter(a => isBankAccount(a.accountType));
    const investmentAccounts = accounts.filter(a => isInvestmentAccount(a.accountType));

    return (
        <>
            {bankAccounts.length > 0 && (
                <>
                    <Heading marginBottom='5px'>Accounts</Heading>
                    <Pane display='flex' flexWrap='wrap'>
                        {bankAccounts.map(account => (
                            <AccountSummary key={account.id} accountId={account.id} />
                        ))}
                    </Pane>
                </>
            )}

            {investmentAccounts.length > 0 && (
                <>
                    <Heading marginBottom='5px'>Investments</Heading>
                    <Pane display='flex' flexWrap='wrap'>
                        {investmentAccounts.map(account => (
                            <InvestmentSummary key={account.id} accountId={account.id} />
                        ))}
                    </Pane>
                </>
            )}
        </>
    );
};
