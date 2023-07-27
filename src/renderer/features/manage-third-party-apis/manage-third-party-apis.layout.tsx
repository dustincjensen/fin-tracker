import { Pane } from 'evergreen-ui';
import React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { OpenExchangeRatesApi } from './open-exchange-rates-api.component';

export const ManageThirdPartyApisLayout = () => {
  return (
    <ErrorBoundary>
      <Pane display='grid' alignItems='center' justifyContent='center' height='100%' padding={20}>
        <OpenExchangeRatesApi />
      </Pane>
    </ErrorBoundary>
  );
};
