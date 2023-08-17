import { shallow } from 'enzyme';
import { ChartIcon } from 'evergreen-ui';
import React from 'react';
import { InvestmentSummary } from './investment-summary.component';
import * as useInvestmentSummaryHook from './investment-summary.hook';
import { IInvestmentSummaryProps } from './investment-summary.props.interface';

describe('components', () => {
    describe('InvestmentSummary', () => {
        let props: IInvestmentSummaryProps;

        beforeEach(() => {
            props = {
                accountId: 'accountId',
            };
        });

        it('should render empty account when balance is undefined', () => {
            jest.spyOn(useInvestmentSummaryHook, 'useInvestmentSummary').mockReturnValue({
                name: 'TFSA',
                icon: ChartIcon,
                balance: undefined,
                latestDate: '2021-07-12',
            });

            const component = shallow(<InvestmentSummary {...props} />);
            expect(component.find('[data-name="empty-account"]').length).toBe(1);
            expect(component.find('[data-name="account-details"]').length).toBe(0);
        });

        it('should render account details when balance is defined', () => {
            jest.spyOn(useInvestmentSummaryHook, 'useInvestmentSummary').mockReturnValue({
                name: 'TFSA',
                icon: ChartIcon,
                balance: 12345.54,
                latestDate: '2021-07-12',
            });

            const component = shallow(<InvestmentSummary {...props} />);
            expect(component.find('[data-name="empty-account"]').length).toBe(0);
            expect(component.find('[data-name="account-details"]').length).toBe(1);
        });
    });
});
