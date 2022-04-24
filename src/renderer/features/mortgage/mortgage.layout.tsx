import { Pane, Table, TextInputField } from 'evergreen-ui';
import * as React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { useLocalStorage } from '../../hooks/use-local-storage.hook';
import { createDate, endOfNextMonth, formatDateFull, today } from '../../utils/date.utils';
import { createStaticWidthCell } from '../../utils/table.utils';

const startingBalanceLs = 'mortgage_startingBalanceLs';
const interestRateLs = 'mortgage_interestRateLs';
const paymentAmountLs = 'mortgage_paymentAmountLs';
const w100 = createStaticWidthCell(100);
const w200 = createStaticWidthCell(200);

const effectiveMonthlyInterestRate = (interestRate: number) => {
  const rate = Math.pow(Math.pow((1 + interestRate / 100 / 2), 2), 1/12) - 1;
  return rate;
};

export const MortgageLayout = () => {
  const [lsStartingBalance, setLsStartingBalance] = useLocalStorage(startingBalanceLs, 0);
  const [lsInterestRate, setLsInterestRate] = useLocalStorage(interestRateLs, 0);
  const [lsPaymentAmount, setLsPaymentAmount] = useLocalStorage(paymentAmountLs, 0);

  const [startingBalance, setStartingBalance] = React.useState(lsStartingBalance || 0);
  const [interestRate, setInterestRate] = React.useState(lsInterestRate || 0);
  const [paymentAmount, setPaymentAmount] = React.useState(lsPaymentAmount || 0);

  const handleStartingBalance = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => 
    {
      try {
        const parsedValue = parseFloat(evt.currentTarget.value);
        if (parsedValue !== NaN) {
          setStartingBalance(parsedValue);
          setLsStartingBalance(parsedValue);
        }
      } catch {}
    }, []);
  const handleInterestRate = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const parsedValue = parseFloat(evt.currentTarget.value);
      if (parsedValue !== NaN) {
      setInterestRate(parsedValue);
      setLsInterestRate(parsedValue);
      }
    } catch {}
  }, []);
  const handlePaymentAmount = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const parsedValue = parseFloat(evt.currentTarget.value);
      if (parsedValue !== NaN) {
      setPaymentAmount(parsedValue);
      setLsPaymentAmount(parsedValue);
      }
    } catch {}
  }, []);

  const years = 25;
  const paymentsPerYear = 12;
  const firstPaymentDate = createDate('2021-08-30');
  const effectiveRate = effectiveMonthlyInterestRate(interestRate);

  const payments = React.useMemo(() => {
    const compareDate = createDate(today());
    const iterations = years * paymentsPerYear;
    let runningBalance = startingBalance;
    let runningDate = firstPaymentDate;

    const rows = [];
    for (let i = 0; i < iterations; i++) {
      const interest = parseFloat((runningBalance * effectiveRate).toFixed(2));
      const principal = paymentAmount - interest;
      const balance = runningBalance - principal;

      const row = {
        id: i,
        date: runningDate,
        paymentNumber: i + 1,
        interest,
        principal,
        balance,
        pastDate: runningDate < compareDate
      };
      rows.push(row);

      runningBalance = balance;
      runningDate = endOfNextMonth(runningDate);
    }

    return rows;
    // TODO only calculate on submit...
  }, [startingBalance]);//, paymentAmount, effectiveRate, firstPaymentDate, years, paymentsPerYear]);

  return (
    <ErrorBoundary>
      <Pane>
        <TextInputField type='number' label='Starting balance' value={startingBalance} onChange={handleStartingBalance} />
        <TextInputField type='number' label='Interest Rate' value={interestRate} onChange={handleInterestRate} />
        <TextInputField type='number' label='Payment Amount' value={paymentAmount} onChange={handlePaymentAmount} />
      </Pane>

      <Table>
           {/* Why is paddingRight={17} the default? */}
           <Table.Head paddingRight={0}>
             <Table.TextHeaderCell {...w200}>Date</Table.TextHeaderCell>
             <Table.TextHeaderCell {...w100}>Payment</Table.TextHeaderCell>
             <Table.TextHeaderCell {...w100}>Principal</Table.TextHeaderCell>
             <Table.TextHeaderCell {...w100}>Interest</Table.TextHeaderCell>
             <Table.TextHeaderCell {...w100}>Balance</Table.TextHeaderCell>
           </Table.Head>
           <Table.Body>
            {payments.map(payment => {
              return (
                  <Pane key={payment.id}>
                    <Table.Row background={payment.pastDate ? 'green200' : undefined}> {/* isSelectable */}
                      <Table.TextCell {...w200}>{formatDateFull(payment.date)}</Table.TextCell>
                      <Table.TextCell {...w100}>{payment.paymentNumber}</Table.TextCell>
                      <Table.TextCell isNumber textAlign='right' {...w100}>{payment.principal.toFixed(2)}</Table.TextCell>
                      <Table.TextCell isNumber textAlign='right' {...w100}>
                        {payment.interest.toFixed(2)}
                      </Table.TextCell>
                      <Table.TextCell isNumber textAlign='right' {...w100}>
                        {payment.balance.toFixed(2)}
                      </Table.TextCell>
                  </Table.Row>
                </Pane>
              );
            })}
{/* 
             {records?.map(record => {
              // TODO move interest calc outside of map
              const monthlyInterest = interestRate / 100 / 12;
              const totalInterest = runningBalance * monthlyInterest;

              if (record?.credit) {
                console.log(runningBalance);
                console.log(record.credit);
                runningBalance = runningBalance + (record.credit);
              } else if (record?.debit) {
                console.log(runningBalance);
                console.log(record.debit);
                runningBalance = runningBalance - (record.debit - totalInterest);
              }

              console.log(monthlyInterest);
              console.log(totalInterest);
              console.log(runningBalance); */}
          </Table.Body>
        </Table>
    </ErrorBoundary>
  );
};
