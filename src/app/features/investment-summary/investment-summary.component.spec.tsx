import { ChartIcon } from 'evergreen-ui';
import React from 'react';
import { render, screen } from '../../utils/test.utils';
import { InvestmentSummary, InvestmentSummaryProps } from './investment-summary.component';
import * as useInvestmentSummaryHook from './investment-summary.hook';

describe('components', () => {
    describe('InvestmentSummary', () => {
        let props: InvestmentSummaryProps;

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

            render(<InvestmentSummary {...props} />);

            expect(screen.getByTestId('empty-account')).toBeInTheDocument();
            expect(screen.queryByTestId('account-details')).not.toBeInTheDocument();
        });

        it('should render account details when balance is defined', () => {
            jest.spyOn(useInvestmentSummaryHook, 'useInvestmentSummary').mockReturnValue({
                name: 'TFSA',
                icon: ChartIcon,
                balance: 12345.54,
                latestDate: '2021-07-12',
            });

            render(<InvestmentSummary {...props} />);

            expect(screen.queryByTestId('empty-account')).not.toBeInTheDocument();
            expect(screen.getByTestId('account-details')).toBeInTheDocument();
        });
    });
});
