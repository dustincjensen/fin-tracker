import { Dialog, FormField, majorScale, TextInputField, SegmentedControl, TextInput, Pane } from 'evergreen-ui';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useBackgroundWorkerContext } from '../../background-worker-provider.component';
import { CategorySelect, CategorySelectProps } from '../../components/category-select/category-select.component';
import { DatePicker } from '../../components/date-picker/date-picker.component';
import { useCategories } from '../../hooks/categories/use-categories.hook';
import { Record } from '../../models/record.type';
import { AccountSelectors } from '../../store/account/account.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import { newGuid } from '../../utils/guid.utils';
import { isNullOrWhitespace } from '../../utils/object.utils';

// TODO this is confusing...
type CategoryRecord = CategorySelectProps['record'];

const options = [
    { label: 'Debit', value: 'debit' },
    { label: 'Credit', value: 'credit' },
];

type AddNewRecordProps = {
    /**
     * The account to add the record to.
     */
    accountId: string;

    /**
     * True if the dialog should be shown.
     */
    isShown: boolean;

    /**
     * Action to call when the modal closes.
     */
    onClose: () => void;
};

// TODO review this component
export const AddNewRecordDialog = ({ accountId, isShown, onClose }: AddNewRecordProps) => {
    const { categories } = useCategories();
    const account = useSelector((state: IStore) => AccountSelectors.account(state, accountId), shallowEqual);
    const existingRecords = useSelector(
        (state: IStore) => RecordSelectors.recordsByAccountId(state, accountId),
        shallowEqual
    );
    const worker = useBackgroundWorkerContext();

    const [transactionDate, setTransactionDate] = React.useState('');
    const [transactionDateError, setTransactionDateError] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [descriptionError, setDescriptionError] = React.useState('');
    const [categoryRecord, setCategoryRecord] = React.useState<CategoryRecord>({ id: undefined, category: undefined });
    const [amount, setAmount] = React.useState<number | ''>('');
    const [amountError, setAmountError] = React.useState('');
    const [debitOrCredit, setDebitOrCredit] = React.useState('');

    React.useEffect(() => {
        setTransactionDate('');
        setTransactionDateError('');

        setDescription('');
        setDescriptionError('');

        setCategoryRecord({ id: undefined, category: undefined });

        setAmount('');
        setAmountError('');
        setDebitOrCredit('');
    }, [isShown]);

    const confirm = () => {
        let hasError = false;

        // The Transaction date cannot be blank.
        if (isNullOrWhitespace(transactionDate)) {
            hasError = true;
            setTransactionDateError('Please select a transaction date.');
        } else {
            setTransactionDateError('');
        }

        // Description should not be blank.
        if (isNullOrWhitespace(description)) {
            hasError = true;
            setDescriptionError('Please enter a description.');
        } else {
            setDescriptionError('');
        }

        // Amount should be not be '', zero, or a number with more than 2 decimals.
        let newAmountError = '';
        if (typeof amount === 'string' || amount === 0) {
            hasError = true;
            newAmountError = 'Please enter an amount';
        } else {
            const amount0 = parseFloat((amount as number).toFixed(0));
            const amount1 = parseFloat((amount as number).toFixed(1));
            const amount2 = parseFloat((amount as number).toFixed(2));
            if (amount !== amount0 && amount !== amount1 && amount !== amount2) {
                hasError = true;
                newAmountError = 'Please enter a valid amount';
            }
        }

        // Debit or credit sould be selected.
        if (debitOrCredit === '') {
            hasError = true;
            newAmountError =
                newAmountError === ''
                    ? 'Please set the amount type to debit or credit'
                    : `${newAmountError} and set the type to debit or credit`;
        }
        setAmountError(newAmountError === '' ? '' : `${newAmountError}.`);

        if (hasError) {
            return;
        }

        const newRecords: Record[] = [
            {
                isManualEntry: true,
                accountId,
                date: transactionDate,
                description,
                id: newGuid(),
                categoryId: categoryRecord?.category?.id,
                credit: debitOrCredit === 'credit' ? (amount as number) : undefined,
                debit: debitOrCredit === 'debit' ? (amount as number) : undefined,
                autoCategoryId: undefined, // TODO We should probably technically look up the auto categories and make sure it doesn't match one.
                details: undefined,
                splitRecords: undefined,
                balance: undefined,
            },
        ];
        worker.invokeBackgroundTask?.('NEW_RECORDS_MERGED', [account.startingBalance, newRecords, existingRecords]);
        onClose();
    };

    const updateCategory = (_: string, categoryId: string) => {
        setCategoryRecord({
            id: undefined,
            category: categoryId ? categories.find(c => c.id === categoryId) : undefined,
        });
    };

    const amountChange = (value: string) => {
        try {
            const newValue = parseFloat(value || '0.0');
            setAmount(newValue);
        } catch (error) {}
    };

    return (
        <Dialog
            isShown={isShown}
            onCloseComplete={onClose}
            preventBodyScrolling
            confirmLabel='Save Transaction'
            title='New Transaction'
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

            <TextInputField
                label='Description'
                value={description}
                marginBottom={majorScale(3)}
                onChange={evt => setDescription(evt.target.value)}
                required
                validationMessage={descriptionError || undefined}
            />

            <FormField label='Category' marginBottom={majorScale(3)}>
                <CategorySelect record={categoryRecord} categories={categories} updateCategory={updateCategory} />
            </FormField>

            <FormField
                label='Amount'
                isRequired
                description='A positive, non-zero number with a maximum of 2 decimal places.'
                validationMessage={amountError || undefined}
            >
                <Pane display='flex' alignItems='center'>
                    <TextInput
                        type='number'
                        step={0.01}
                        min={0}
                        value={amount}
                        onChange={evt => amountChange(evt.target.value)}
                        marginRight={10}
                    />
                    {/* TODO deprecated */}
                    {/* Removed in v7 */}
                    <SegmentedControl
                        name='debitOrCredit'
                        options={options}
                        value={debitOrCredit}
                        onChange={value => setDebitOrCredit(value as string)}
                        width={150}
                    />
                </Pane>
            </FormField>
        </Dialog>
    );
};
