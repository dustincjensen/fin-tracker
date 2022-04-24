import { Button, Pane, Table, TextInputField } from 'evergreen-ui';
import * as React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { formatDateFull } from '../../utils/date.utils';
import { createStaticWidthCell } from '../../utils/table.utils';
import { useMortgage } from './use-mortgage.hook';

const w100 = createStaticWidthCell(100);
const w200 = createStaticWidthCell(200);

export const MortgageLayout = () => {
  const { startingBalance, handleStartingBalance, interestRate, handleInterestRate, paymentAmount, handlePaymentAmount,
  payments, calculatePayments } = useMortgage();

  return (
    <Pane padding={20}>
    <ErrorBoundary>
      <Pane display='flex' alignItems='center'>
        <TextInputField type='number' label='Starting balance' value={startingBalance} onChange={handleStartingBalance} marginRight={10} />
        <TextInputField type='number' label='Interest Rate' value={interestRate} onChange={handleInterestRate} marginRight={10}/>
        <TextInputField type='number' label='Payment Amount' value={paymentAmount} onChange={handlePaymentAmount} marginRight={10}/>
        <Button onClick={calculatePayments} appearance='primary'>Calculate</Button>
      </Pane>

      <Table>
           {/* Why is paddingRight={17} the default? */}
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
                      <Table.TextCell isNumber textAlign='right' {...w100}>{payment.principal.toFixed(2)}</Table.TextCell>
                      <Table.TextCell isNumber textAlign='right' {...w100}>
                        {payment.interest.toFixed(2)}
                      </Table.TextCell>
                      <Table.TextCell isNumber textAlign='right' {...w100}>
                        {payment.balance.toFixed(2)}
                      </Table.TextCell>
                      <Table.TextCell>
                        {payment?.associatedRecord}
                      </Table.TextCell>
                  </Table.Row>
                </Pane>
              );
            })}
          </Table.Body>
        </Table>
    </ErrorBoundary>
    </Pane>
  );
};
