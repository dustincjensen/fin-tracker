import { AddIcon, Button, Heading, Pane } from 'evergreen-ui';
import React from 'react';
import { useSelector } from 'react-redux';
import { AccountSelectors } from '../../store/account/account.selectors';
import { IStore } from '../../store/store.interface';
import { AddNewInvestmentRecordDialog } from './add-new-investment-record.dialog';
import { InvestmentRecords } from './investment-records.component';

type InvestmentForCurrencyProps = {
    /**
     * The ID of the investment account.
     */
    accountId: string;

    /**
     * The currency type.
     */
    currency: string;
};

export const InvestmentForCurrency = ({ accountId, currency }: InvestmentForCurrencyProps) => {
    const [isAddBalanceShown, setIsAddBalanceShown] = React.useState(false);
    const toggleShown = () => setIsAddBalanceShown(s => !s);
    const { archived } = useSelector((state: IStore) => AccountSelectors.account(state, accountId));

    return (
        <Pane>
            <Pane display='flex' justifyContent='space-between' marginBottom={10}>
                <Heading size={700}>{currency}</Heading>
                {!archived && (
                    <Button iconBefore={AddIcon} appearance='primary' intent='success' onClick={toggleShown}>
                        Add Balance
                    </Button>
                )}
            </Pane>

            <InvestmentRecords accountId={accountId} currency={currency} />

            {isAddBalanceShown && (
                <AddNewInvestmentRecordDialog accountId={accountId} currency={currency} onClose={toggleShown} />
            )}
        </Pane>
    );
};
