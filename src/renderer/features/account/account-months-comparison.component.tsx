import * as React from 'react';
import { IAccountMonthsComparisonProps } from './account-months-comparison.component.interface';

export class AccountMonthsComparison extends React.Component<IAccountMonthsComparisonProps> {
  public render() {
    const { previousMonthEndBalance, currentMonthEndBalance } = this.props;
    return (
      <div>
        <div>Previous: {previousMonthEndBalance}</div>
        <div>Current: {currentMonthEndBalance}</div>
      </div>
    );
  }
}
