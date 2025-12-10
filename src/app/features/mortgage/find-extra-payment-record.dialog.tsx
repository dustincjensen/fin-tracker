/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, FormField, majorScale, SelectMenu, SelectMenuItem } from 'evergreen-ui';
import React from 'react';
import { formatDateFull } from '../../utils/date.utils';
import { useFindExtraPaymentRecord } from './find-extra-payment-record.hook';
import { MatchingRecord } from './find-payment-record.hook';

type FindPaymentRecordDialogProps = {
    /**
     * The record edit the details of.
     */
    paymentAmount: any;

    isOpen: boolean;

    /**
     * Action to call when the modal closes.
     */
    onClose: (matchingRecord: MatchingRecord) => void;
};

export const FindExtraPaymentRecordDialogComponent = ({
    isOpen,
    paymentAmount,
    onClose,
}: FindPaymentRecordDialogProps) => {
    const { matchingRecords } = useFindExtraPaymentRecord(paymentAmount);
    const [selectedRecord, setSelectedRecord] = React.useState<string | null>(null);

    const confirm = () => {
        onClose(selectedRecord ? matchingRecords.find(r => r.id === selectedRecord) : null);
        setSelectedRecord(null);
    };

    // Use 2 states, one for the id and one for the string label representation of the selected record.
    const onSelect = (item: SelectMenuItem) => setSelectedRecord(item.value.toString());

    if (!isOpen) {
        return null;
    }

    const options = matchingRecords
        ? matchingRecords.map(r => ({
              label: `${formatDateFull(r.date as any)} - Debit: ${r.debit}`,
              value: r.id,
          }))
        : [];

    return (
        <Dialog
            isShown={true}
            onCloseComplete={() => {
                onClose(null);
                setSelectedRecord(null);
            }}
            preventBodyScrolling
            confirmLabel='Confirm Selection'
            title='Find Payment Record'
            onConfirm={confirm}
            shouldCloseOnOverlayClick={false}
        >
            <FormField label='Matching records' marginBottom={majorScale(3)}>
                <SelectMenu
                    title='Select Matching Record'
                    options={options}
                    selected={selectedRecord}
                    onSelect={onSelect}
                >
                    <Button minWidth={150} marginRight={3}>
                        {selectedRecord || 'Select Record...'}
                    </Button>
                </SelectMenu>
            </FormField>
        </Dialog>
    );
};

export const FindExtraPaymentRecordDialog = React.memo(FindExtraPaymentRecordDialogComponent);
