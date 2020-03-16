import * as React from 'react';
import { IAccountMonthsComparisonProps } from './account-months-comparison.component.interface';
import { Pane, Text, Strong } from 'evergreen-ui';

export class AccountMonthsComparison extends React.Component<IAccountMonthsComparisonProps> {
  public render() {
    const { previousMonthEndBalance, currentMonthEndBalance } = this.props;
    return (
      <Pane marginBottom={20}>
        <Pane>
          <Text size={500}>Previous: </Text>
          <Strong size={500}>{previousMonthEndBalance}</Strong>
        </Pane>
        <Pane>
          <Text size={500}>Current: </Text>
          <Strong size={500}>{currentMonthEndBalance}</Strong>
        </Pane>
      </Pane>
    );
  }
}
