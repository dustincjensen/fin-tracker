import { Pane, Heading } from 'evergreen-ui';
import * as React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { AccountSummariesContainer } from './account-summaries.container';
import { CombinedSummaryContainer } from './combined-summary.container';
import { InstructionsContainer } from './instructions.container';

export const HomeLayout: React.FC = () => (
  <ErrorBoundary>
    <Pane>
      <Heading size={700}>Home</Heading>
      <Pane>
        <InstructionsContainer />
        <AccountSummariesContainer />
        <CombinedSummaryContainer />
      </Pane>
    </Pane>
  </ErrorBoundary>
);
