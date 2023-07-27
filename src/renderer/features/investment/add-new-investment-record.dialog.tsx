import { Dialog, FormField, majorScale, TextInput } from 'evergreen-ui';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DatePicker } from '../../components/date-picker/date-picker.component';
import { InvestmentRecordActions } from '../../store/investment-record/investment-record.actions';
import { IInvestmentRecord } from '../../store/investment-record/investment-record.interface';
import { newGuid } from '../../utils/guid.utils';
import { isNullOrWhitespace } from '../../utils/object.utils';

type AddNewInvestmentRecordProps = {
  /**
   * The account to add the record to.
   */
  accountId: string;

  /**
   * The currency type for the record.
   */
  currency: string;

  /**
   * Action to call when the modal closes.
   */
  onClose: () => void;
};

export const AddNewInvestmentRecordDialog = ({ accountId, currency, onClose }: AddNewInvestmentRecordProps) => {
  const dispatch = useDispatch();
  const [transactionDate, setTransactionDate] = React.useState('');
  const [transactionDateError, setTransactionDateError] = React.useState('');
  const [balance, setBalance] = React.useState<number | ''>('');
  const [balanceError, setBalanceError] = React.useState('');

  const confirm = () => {
    let hasError = false;

    // The Transaction date cannot be blank.
    if (isNullOrWhitespace(transactionDate)) {
      hasError = true;
      setTransactionDateError('Please select a transaction date.');
    } else {
      setTransactionDateError('');
    }

    // Balance should be not be '', zero, or a number with more than 2 decimals.
    let newBalanceError = '';
    if (typeof balance === 'string') {
      hasError = true;
      newBalanceError = 'Please enter a balance';
    } else {
      const balance0 = parseFloat((balance as number).toFixed(0));
      const balance1 = parseFloat((balance as number).toFixed(1));
      const balance2 = parseFloat((balance as number).toFixed(2));
      if (balance !== balance0 && balance !== balance1 && balance !== balance2) {
        hasError = true;
        newBalanceError = 'Please enter a valid balance';
      }
    }

    setBalanceError(newBalanceError === '' ? '' : `${newBalanceError}.`);

    if (hasError) {
      return;
    }

    const newRecord: IInvestmentRecord = {
      id: newGuid(),
      accountId,
      date: transactionDate,
      investmentCurrency: currency,
      balance: balance as number,
    };

    dispatch(InvestmentRecordActions.addRecord(newRecord));

    onClose();
  };

  const amountChange = (value: string) => {
    try {
      const newValue = parseFloat(value || '0.0');
      setBalance(newValue);
    } catch (error) {}
  };

  return (
    <Dialog
      isShown
      preventBodyScrolling
      onCloseComplete={onClose}
      confirmLabel='Save Balance'
      title='New Balance'
      onConfirm={confirm}
      shouldCloseOnOverlayClick={false}
    >
      <FormField
        label='Transaction Date'
        marginBottom={majorScale(3)}
        isRequired
        validationMessage={transactionDateError || undefined}
      >
        <DatePicker value={transactionDate} onChange={setTransactionDate} />
      </FormField>

      <FormField
        label='Balance'
        isRequired
        description='A positive, non-zero number with a maximum of 2 decimal places.'
        validationMessage={balanceError || undefined}
      >
        <TextInput
          type='number'
          step={0.01}
          min={0}
          value={balance}
          onChange={evt => amountChange(evt.target.value)}
          marginRight={10}
        />
      </FormField>
    </Dialog>
  );
};
