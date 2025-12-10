/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useLocalStorage } from '../../hooks/use-local-storage.hook';
import { createDate, endOfNextMonth, isInYearMonth, today } from '../../utils/date.utils';

const effectiveMonthlyInterestRate = (interestRate: number) => {
    const rate = Math.pow(Math.pow(1 + interestRate / 100 / 2, 2), 1 / 12) - 1;
    return rate;
};

const startingBalanceLs = 'mortgage_startingBalanceLs';
const interestRateLs = 'mortgage_interestRateLs';
const paymentAmountLs = 'mortgage_paymentAmountLs';

export const useMortgage = () => {
    const [lsStartingBalance, setLsStartingBalance] = useLocalStorage(startingBalanceLs, 0);
    const [lsInterestRate, setLsInterestRate] = useLocalStorage(interestRateLs, 0);
    const [lsPaymentAmount, setLsPaymentAmount] = useLocalStorage(paymentAmountLs, 0);

    const [startingBalance, setStartingBalance] = React.useState(lsStartingBalance || 0);
    const [interestRate, setInterestRate] = React.useState(lsInterestRate || 0);
    const [paymentAmount, setPaymentAmount] = React.useState(lsPaymentAmount || 0);
    const [payments, setPayments] = React.useState([]);

    const handleStartingBalance = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const parsedValue = parseFloat(evt.currentTarget.value);
            if (!Number.isNaN(parsedValue)) {
                setStartingBalance(parsedValue);
                setLsStartingBalance(parsedValue);
            }
        } catch {}
    }, []);
    const handleInterestRate = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const parsedValue = parseFloat(evt.currentTarget.value);
            if (!Number.isNaN(parsedValue)) {
                setInterestRate(parsedValue);
                setLsInterestRate(parsedValue);
            }
        } catch {}
    }, []);
    const handlePaymentAmount = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const parsedValue = parseFloat(evt.currentTarget.value);
            if (!Number.isNaN(parsedValue)) {
                setPaymentAmount(parsedValue);
                setLsPaymentAmount(parsedValue);
            }
        } catch {}
    }, []);

    const years = 25;
    const paymentsPerYear = 12;
    const firstPaymentDate = createDate('2021-08-30');
    const effectiveRate = effectiveMonthlyInterestRate(interestRate);

    const calculatePayments = React.useCallback(() => {
        const compareDate = createDate(today());
        const iterations = years * paymentsPerYear;
        let runningBalance = startingBalance;
        let runningDate = firstPaymentDate;

        const rows = [];
        for (let i = 0; i < iterations; i++) {
            const interest = parseFloat((runningBalance * effectiveRate).toFixed(2));
            const principal = paymentAmount - interest;
            const balance = runningBalance - principal;

            // Don't return more rows if we are done paying the mortgage...
            if (balance < 0) {
                break;
            }

            const row = {
                id: i,
                date: runningDate,
                paymentNumber: i + 1,
                paymentAmount: paymentAmount,
                interest,
                principal,
                balance,
                pastDate: runningDate < compareDate,
            };
            rows.push(row);

            runningBalance = balance;
            runningDate = endOfNextMonth(runningDate);
        }

        setPayments(rows);
    }, [startingBalance, paymentAmount, effectiveRate, firstPaymentDate, years, paymentsPerYear]);

    const recalculatePayments = React.useCallback(
        (payments: any[]) => {
            const compareDate = createDate(today());
            const iterations = years * paymentsPerYear;
            let runningBalance = startingBalance;
            let runningDate = firstPaymentDate;

            const rows = [];
            for (let i = 0; i < iterations; i++) {
                const interest = parseFloat((runningBalance * effectiveRate).toFixed(2));
                const principal = paymentAmount - interest;
                let balance = runningBalance - principal;

                // Don't return more rows if we are done paying the mortgage...
                if (balance < 0) {
                    break;
                }

                // TODO fix, payment number is shit
                const matchingRecord = payments.find(p => p.paymentNumber === i + 1)?.associatedRecord;
                console.log('Matching record?', matchingRecord);

                const extraPayment = payments.find(p => isInYearMonth(p.date, runningDate) && p.interest === 0);
                console.log('Extra payment?', extraPayment);

                const row = {
                    id: i,
                    date: runningDate,
                    paymentNumber: i + 1,
                    paymentAmount: paymentAmount,
                    interest,
                    principal,
                    balance,
                    pastDate: runningDate < compareDate,
                    associatedRecord: matchingRecord?.associatedRecord ? matchingRecord.associatedRecord : undefined,
                };
                rows.push(row);

                if (extraPayment) {
                    const extraPrincipal = extraPayment.associatedRecord.debit;
                    balance = balance - extraPrincipal;

                    const extraRow = {
                        id: `${i}-extra`,
                        date: extraPayment.date,
                        paymentNumber: `${i + 1} (extra)`,
                        interest: 0,
                        principal: extraPrincipal,
                        balance,
                        pastDate: extraPayment.date < compareDate,
                        associatedRecord: extraPayment.associatedRecord ? extraPayment.associatedRecord : undefined,
                    };
                    rows.push(extraRow);
                }

                runningBalance = balance;
                runningDate = endOfNextMonth(runningDate);
            }

            setPayments(rows);
        },
        [effectiveRate, firstPaymentDate, paymentAmount, startingBalance]
    );

    return {
        handleInterestRate,
        handlePaymentAmount,
        handleStartingBalance,
        startingBalance,
        interestRate,
        paymentAmount,
        payments,
        calculatePayments,
        recalculatePayments,
    };
};
