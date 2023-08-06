import { Pane } from 'evergreen-ui';
import React from 'react';
import { useActiveAccounts } from '../../../hooks/accounts/use-active-accounts.hook';
import { isBankAccount } from '../../../utils/account.utils';
import { AccountSummary } from '../../account-summary/account-summary.component';
import { InvestmentSummary } from '../../investment-summary/investment-summary.component';

export const AccountSummaries = () => {
  const { activeAccounts } = useActiveAccounts();

  return (
    <Pane display='flex' flexWrap='wrap'>
      {activeAccounts.map(account =>
        isBankAccount(account.accountType) ? (
          <AccountSummary key={account.id} accountId={account.id} />
        ) : (
          <InvestmentSummary key={account.id} accountId={account.id} />
        )
      )}
    </Pane>
  );
};
