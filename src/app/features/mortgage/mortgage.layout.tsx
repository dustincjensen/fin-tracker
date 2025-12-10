/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Pane, SearchIcon, Table, TextInputField } from 'evergreen-ui';
import * as React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { formatNumber } from '../../utils/currency.utils';
import { formatDateFull } from '../../utils/date.utils';
import { createStaticWidthCell } from '../../utils/table.utils';
import { FindExtraPaymentRecordDialog } from './find-extra-payment-record.dialog';
import { FindPaymentRecordDialog } from './find-payment-record.dialog';
import { MatchingRecord } from './find-payment-record.hook';
import { useMortgage } from './use-mortgage.hook';

const w100 = createStaticWidthCell(100);
const w200 = createStaticWidthCell(200);

export const MortgageLayout = () => {
    const {
        startingBalance,
        handleStartingBalance,
        interestRate,
        handleInterestRate,
        paymentAmount,
        handlePaymentAmount,
        payments,
        calculatePayments,
        recalculatePayments,
    } = useMortgage();

    const [paymentToFindRecordFor, setPaymentToFindRecordFor] = React.useState<any>(null);
    const [isFindExtraPaymentRecordDialogOpen, setIsFindExtraPaymentRecordDialogOpen] = React.useState(false);

    const searchForAssociatedRecord = React.useCallback((payment: any) => {
        // open dialog
        console.log(payment);
        setPaymentToFindRecordFor(payment);
    }, []);

    const onSuccessfulRecordAssociation = React.useCallback((payment: any, matchingRecord: MatchingRecord) => {
        console.log('associated', payment, matchingRecord);

        if (matchingRecord !== null) {
            // TODO include account name paid from?
            payment.associatedRecord = matchingRecord;
            // ? `${formatDateFull(matchingRecord.date as moment.Moment)} - ${matchingRecord.description}`
            // : null;
        }

        setPaymentToFindRecordFor(null);
    }, []);

    const onSuccessfulExtraPaymentRecordAssociation = React.useCallback(
        (matchingRecord: MatchingRecord) => {
            console.log('associated extra payment', matchingRecord);

            if (matchingRecord) {
                const extraPayment = {
                    date: matchingRecord.date,
                    interest: 0,
                    associatedRecord: matchingRecord,
                };

                recalculatePayments([...payments, extraPayment]);
            }

            setIsFindExtraPaymentRecordDialogOpen(false);
        },
        [payments, recalculatePayments]
    );

    return (
        <Pane padding={20}>
            <ErrorBoundary>
                <Pane display='flex' alignItems='center'>
                    <TextInputField
                        type='number'
                        label='Starting balance'
                        value={startingBalance}
                        onChange={handleStartingBalance}
                        marginRight={10}
                    />
                    <TextInputField
                        type='number'
                        label='Interest Rate'
                        value={interestRate}
                        onChange={handleInterestRate}
                        marginRight={10}
                    />
                    <TextInputField
                        type='number'
                        label='Payment Amount'
                        value={paymentAmount}
                        onChange={handlePaymentAmount}
                        marginRight={10}
                    />
                    <Button onClick={calculatePayments} appearance='primary'>
                        Calculate
                    </Button>
                </Pane>

                {payments?.length > 0 && (
                    <Button onClick={() => setIsFindExtraPaymentRecordDialogOpen(true)} appearance='primary'>
                        Find Extra Payment Record
                    </Button>
                )}

                <Table>
                    <Table.Head paddingRight={0}>
                        <Table.TextHeaderCell {...w200}>Date</Table.TextHeaderCell>
                        <Table.TextHeaderCell {...w100}>Payment</Table.TextHeaderCell>
                        <Table.TextHeaderCell {...w100}>Principal</Table.TextHeaderCell>
                        <Table.TextHeaderCell {...w100}>Interest</Table.TextHeaderCell>
                        <Table.TextHeaderCell {...w100}>Balance</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Associated Record</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body>
                        {payments.map(payment => {
                            return (
                                <Pane key={payment.id}>
                                    <Table.Row background={payment.pastDate ? 'green200' : undefined}>
                                        <Table.TextCell {...w200}>{formatDateFull(payment.date)}</Table.TextCell>
                                        <Table.TextCell {...w100}>{payment.paymentNumber}</Table.TextCell>
                                        <Table.TextCell isNumber textAlign='right' {...w100}>
                                            {formatNumber(payment.principal)}
                                        </Table.TextCell>
                                        <Table.TextCell isNumber textAlign='right' {...w100}>
                                            {formatNumber(payment.interest)}
                                        </Table.TextCell>
                                        <Table.TextCell isNumber textAlign='right' {...w100}>
                                            {formatNumber(payment.balance)}
                                        </Table.TextCell>

                                        {payment?.associatedRecord ? (
                                            <Table.TextCell>{JSON.stringify(payment?.associatedRecord)}</Table.TextCell>
                                        ) : (
                                            <Table.Cell>
                                                <Button
                                                    iconBefore={SearchIcon}
                                                    // appearance='minimal'
                                                    onClick={() => searchForAssociatedRecord(payment)}
                                                >
                                                    Find payment record
                                                </Button>
                                            </Table.Cell>
                                        )}
                                    </Table.Row>
                                </Pane>
                            );
                        })}
                    </Table.Body>

                    <FindPaymentRecordDialog payment={paymentToFindRecordFor} onClose={onSuccessfulRecordAssociation} />
                    <FindExtraPaymentRecordDialog
                        paymentAmount={paymentAmount}
                        isOpen={isFindExtraPaymentRecordDialogOpen}
                        onClose={onSuccessfulExtraPaymentRecordAssociation}
                    />
                </Table>
            </ErrorBoundary>
        </Pane>
    );
};
