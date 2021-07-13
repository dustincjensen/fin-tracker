import { shallow } from 'enzyme';
import { BankAccountIcon } from 'evergreen-ui';
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { AccountSummary } from './account-summary.component';
import { IAccountSummaryProps } from './account-summary.props.interface';

describe('components', () => {
  describe('AccountSummary', () => {
    let props: IAccountSummaryProps;

    beforeEach(() => {
      props = {
        accountId: 'accountId'
      };
    });

    const assertRenderDetails = (balance: number, emptyAccountLength: number, accountDetailsLength: number) => {
      jest.spyOn(ReactRedux, 'useSelector').mockReturnValueOnce({ 
        name: 'TestAccount',
        balance,
        dateOfLastTransaction: '2021-07-12',
        icon: BankAccountIcon
      });

      const component = shallow(<AccountSummary {...props} />);
      expect(component.find('[data-name="empty-account"]').length).toBe(emptyAccountLength);
      expect(component.find('[data-name="account-details"]').length).toBe(accountDetailsLength);
    };

    it('should render empty account when balance undefined', () => assertRenderDetails(undefined, 1, 0));
    it('should render empty account when balance null', () => assertRenderDetails(null, 1, 0));
    it('should render account details when balance is provided', () => assertRenderDetails(1.23, 0, 1));
  });
});
