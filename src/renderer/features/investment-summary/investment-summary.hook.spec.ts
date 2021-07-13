// TODO add @testing-library/react-hooks

// import { shallow } from 'enzyme';
// import * as React from 'react';
// import * as ReactRedux from 'react-redux';
// import { IAccount } from '../../store/account/account.interface';
// import { IInvestmentRecord } from '../../store/investment-record/investment-record.interface';
// import * as useBalanceByRate from '../investment/_hooks/use-balance-by-rate.hook';
// import { InvestmentSummary } from './investment-summary.component';
// import { IInvestmentSummaryProps } from './investment-summary.props.interface';

// describe('components', () => {
//   describe('InvestmentSummary', () => {
//     let props: IInvestmentSummaryProps;

//     beforeEach(() => {
//       props = {
//         accountId: 'accountId'
//       };
//       jest.spyOn(ReactRedux, 'useSelector').mockReturnValueOnce({ id: 'accountId', name: 'TestAccount', accountType: 'TFSA' } as IAccount);
//     });

//     it('should render empty account when CAD and USD records are undefined', () => {
//       jest.spyOn(ReactRedux, 'useSelector').mockReturnValueOnce({});
//       jest.spyOn(ReactRedux, 'useSelector').mockReturnValueOnce({});
//       jest.spyOn(useBalanceByRate, 'useBalanceByRate').mockReturnValue({ convertedBalance: undefined, rate: undefined });

//       const component = shallow(<InvestmentSummary {...props} />);
//       expect(component.find('[data-name="empty-account"]').length).toBe(1);
//       expect(component.find('[data-name="account-details"]').length).toBe(0);
//     });

//     it('should render balance when CAD record is present', () => {
//       jest.spyOn(ReactRedux, 'useSelector').mockReturnValueOnce({
//         investmentCurrency: 'CAD',
//         balance: 54321.12,
//         date: '2021-07-12'
//       } as IInvestmentRecord);
//       jest.spyOn(ReactRedux, 'useSelector').mockReturnValueOnce({});
//       jest.spyOn(useBalanceByRate, 'useBalanceByRate').mockReturnValue({ convertedBalance: undefined, rate: undefined });

//       const component = shallow(<InvestmentSummary {...props} />);
//       expect(component.find('[data-name="empty-account"]').length).toBe(0);
//       expect(component.find('[data-name="account-details"]').length).toBe(1);
//       expect(component.find('[data-name="account-balance"]').text()).toBe('54321.12');
//       expect(component.find('[data-name="latest-transaction"]').text()).toBe('July 12, 2021');
//     });

//     it('should render balance when USD record is present', () => {
//       jest.spyOn(ReactRedux, 'useSelector').mockReturnValueOnce({});
//       jest.spyOn(ReactRedux, 'useSelector').mockReturnValueOnce({
//         investmentCurrency: 'USD',
//         balance: 12345.54,
//         date: '2021-08-08'
//       } as IInvestmentRecord);
//       jest.spyOn(useBalanceByRate, 'useBalanceByRate').mockReturnValue({ convertedBalance: 20000.00, rate: undefined });

//       const component = shallow(<InvestmentSummary {...props} />);
//       expect(component.find('[data-name="empty-account"]').length).toBe(0);
//       expect(component.find('[data-name="account-details"]').length).toBe(1);
//       expect(component.find('[data-name="account-balance"]').text()).toBe('20000.00');
//       expect(component.find('[data-name="latest-transaction"]').text()).toBe('August 8, 2021');
//     });

//     it('should select CAD date when CAD is later than USD', () => {
//       jest.spyOn(ReactRedux, 'useSelector').mockReturnValueOnce({
//         investmentCurrency: 'CAD',
//         balance: 12345.54,
//         date: '2021-10-10'
//       } as IInvestmentRecord);
//       jest.spyOn(ReactRedux, 'useSelector').mockReturnValueOnce({
//         investmentCurrency: 'USD',
//         balance: 12345.54,
//         date: '2021-08-08'
//       } as IInvestmentRecord);
//       jest.spyOn(useBalanceByRate, 'useBalanceByRate').mockReturnValue({ convertedBalance: 20000.00, rate: undefined });

//       const component = shallow(<InvestmentSummary {...props} />);
//       expect(component.find('[data-name="latest-transaction"]').text()).toBe('October 10, 2021');
//     });

//     it('should combine CAD and USD balances', () => {
//       jest.spyOn(ReactRedux, 'useSelector').mockReturnValueOnce({
//         investmentCurrency: 'CAD',
//         balance: 10003.99,
//         date: '2021-10-10'
//       } as IInvestmentRecord);
//       jest.spyOn(ReactRedux, 'useSelector').mockReturnValueOnce({
//         investmentCurrency: 'USD',
//         balance: 12345.54,
//         date: '2021-08-08'
//       } as IInvestmentRecord);
//       jest.spyOn(useBalanceByRate, 'useBalanceByRate').mockReturnValue({ convertedBalance: 20000.00, rate: undefined });

//       const component = shallow(<InvestmentSummary {...props} />);
//       expect(component.find('[data-name="account-balance"]').text()).toBe('30003.99');
//     });
//   });
// });
