import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { isBankAccount } from '../../../utils/account.utils';
import { AccountSummary } from '../../account-summary/account-summary.component';
import { InvestmentSummary } from '../../investment-summary/investment-summary.component';

export const AccountSummaries = () => {
  const activeAccounts = useSelector(AccountSelectors.selectActiveAccounts);

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
