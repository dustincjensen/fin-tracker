import { Alert, FormField, majorScale, Pane, Text } from 'evergreen-ui';
import React from 'react';
import { useSelector } from 'react-redux';
import { useCurrentMonthEndBalance } from '../../hooks/records/use-current-month-end-balance.hook';
import { usePreviousMonthEndBalance } from '../../hooks/records/use-previous-month-end-balance.hook';
import { AccountSelectors } from '../../store/account/account.selectors';
import { IStore } from '../../store/store.interface';
import { accountTypeLabels } from '../../utils/account.utils';
import { stringToMonthYear } from '../../utils/date.utils';

const Field = ({ label, text }) => (
    <FormField label={label}>
        <Text>{text}</Text>
    </FormField>
);

type AccountDetailSummaryProps = {
    accountId: string;
    date: string;
    archived: boolean;
};

export const AccountDetailSummary = ({ accountId, date, archived }: AccountDetailSummaryProps) => {
    const account = useSelector((state: IStore) => AccountSelectors.account(state, accountId));
    const { balance: previousMonthEndBalance } = usePreviousMonthEndBalance(accountId, date);
    const { balance: currentMonthEndBalance } = useCurrentMonthEndBalance(accountId, date);
    const displayDate = stringToMonthYear(date);

    return (
        <>
            {archived && (
                <Alert title='This account is archived. No changes can be made.' marginBottom={majorScale(3)} />
            )}
            <Pane
                border
                paddingLeft={40}
                paddingRight={40}
                paddingTop={20}
                paddingBottom={20}
                background='tint1'
                borderRadius={5}
                marginBottom={majorScale(3)}
            >
                <Pane display='flex' justifyContent='space-between'>
                    <Field label='Account Name' text={account?.name} />
                    <Field label='Account Type' text={accountTypeLabels[account?.accountType]} />
                    <Field label='Date' text={displayDate} />
                    <Field label='Previous Balance' text={previousMonthEndBalance?.toFixed(2) ?? ''} />
                    <Field label='End Balance' text={currentMonthEndBalance?.toFixed(2) ?? ''} />
                </Pane>
            </Pane>
        </>
    );
};
