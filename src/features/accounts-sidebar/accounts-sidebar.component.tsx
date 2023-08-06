import { Pane, Heading } from 'evergreen-ui';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from '../../components/nav-link/nav-link.component';
import { useActiveAccounts } from '../../hooks/accounts/use-active-accounts.hook';
import { IAccount } from '../../store/account/account.interface';
import { accountRoutes, accountTypeIcons, isBankAccount, isInvestmentAccount } from '../../utils/account.utils';

const AccountLink = ({ account, pathname }: { account: IAccount; pathname: string }) => {
    const type = account.accountType;
    const toLocation = `${accountRoutes[type]}/${account.id}`;
    const icon = accountTypeIcons[account.accountType];
    const isSelected = pathname === toLocation;
    return <NavLink key={account.id} to={toLocation} text={account.name} iconBefore={icon} isSelected={isSelected} />;
};

export const AccountsSidebar = () => {
    const { pathname } = useLocation<Location>();
    const { activeAccounts: accounts } = useActiveAccounts();

    const bankAccounts = accounts.filter(a => isBankAccount(a.accountType));
    const investmentAccounts = accounts.filter(a => isInvestmentAccount(a.accountType));

    return (
        <Pane display='flex' flexDirection='column'>
            {bankAccounts?.length > 0 && (
                <>
                    <Heading size={100} marginTop='20px' marginBottom='5px'>
                        Accounts
                    </Heading>
                    {bankAccounts.map(account => (
                        <AccountLink key={account.id} account={account} pathname={pathname} />
                    ))}
                </>
            )}

            {investmentAccounts?.length > 0 && (
                <>
                    <Heading size={100} marginTop='20px' marginBottom='5px'>
                        Investments
                    </Heading>
                    {investmentAccounts.map(account => (
                        <AccountLink key={account.id} account={account} pathname={pathname} />
                    ))}
                </>
            )}
        </Pane>
    );
};
