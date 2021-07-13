/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { InvestmentDetailSummary } from './investment-detail-summary/investment-detail-summary.component';
import { InvestmentForCurrency } from './investment-for-currency/investment-for-currency.component';
import { TransferHistory } from './transfer-history/transfer-history.component';

export const InvestmentLayout = () => {
  const {accountId} = useParams<{ accountId: string }>();
  return (
    <ErrorBoundary>
      <Pane padding={20}>
        <InvestmentDetailSummary accountId={accountId} />
        <Pane display='grid' gridTemplateColumns='1fr 1fr' columnGap='20px' marginBottom={30}>
          <InvestmentForCurrency accountId={accountId} currency='CAD' />
          <InvestmentForCurrency accountId={accountId} currency='USD' />
        </Pane>
        <TransferHistory accountId={accountId} />
      </Pane>
    </ErrorBoundary>
  );
};
