import { Pane, Heading } from 'evergreen-ui';
import * as React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { AccountSummariesContainer } from './account-summaries.container';

export const HomeLayout: React.FC = () => (
  <ErrorBoundary>
    <Pane>
      <Heading size={700}>Home</Heading>
      <Pane>
        <AccountSummariesContainer />
      </Pane>
    </Pane>
  </ErrorBoundary>
);
