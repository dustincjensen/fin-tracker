import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { AccountSummary } from '../../components/account-summary/account-summary.component';
import { IAccountSummariesProps } from './account-summaries.props.interface';

export const AccountSummaries = ({ accounts }: IAccountSummariesProps) => {
  return (
    <Pane display='flex' flexWrap='wrap'>
      {accounts.map(acc => {
        return <AccountSummary key={acc.accountId} {...acc} />;
      })}
    </Pane>
  );
};
