import { Pane, Heading } from 'evergreen-ui';
import * as React from 'react';
import { AccountSummariesContainer } from './account-summaries.container';

export const HomeLayout: React.FC = () => (
  <Pane>
    <Heading size={700}>Home</Heading>
    <Pane>
      <AccountSummariesContainer />
    </Pane>
  </Pane>
);
