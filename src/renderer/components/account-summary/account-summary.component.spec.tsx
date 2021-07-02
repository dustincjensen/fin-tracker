import { shallow } from 'enzyme';
import { BankAccountIcon } from 'evergreen-ui';
import * as React from 'react';
import { AccountSummary } from './account-summary.component';
import { IAccountSummaryProps } from './account-summary.props.interface';

describe('components', () => {
  describe('AccountSummary', () => {
    let props: IAccountSummaryProps;

    beforeEach(() => {
      props = {
        accountId: 'accountId',
        balance: undefined,
        dateOfLastTransaction: undefined,
        icon: BankAccountIcon,
        name: 'Savings',
      };
    });

    const assertRenderDetails = (balance: number, emptyAccountLength: number, accountDetailsLength: number) => {
      const component = shallow(<AccountSummary {...props} balance={balance} />);
      expect(component.find('[data-name="empty-account"]').length).toBe(emptyAccountLength);
      expect(component.find('[data-name="account-details"]').length).toBe(accountDetailsLength);
    };

    it('should render empty account when balance undefined', () => assertRenderDetails(undefined, 1, 0));
    it('should render empty account when balance null', () => assertRenderDetails(null, 1, 0));
    it('should render account details when balance is provided', () => assertRenderDetails(1.23, 0, 1));
  });
});
