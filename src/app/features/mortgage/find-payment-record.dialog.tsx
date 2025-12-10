/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, FormField, majorScale, Text } from 'evergreen-ui';
import React from 'react';
import { formatDateFull } from '../../utils/date.utils';
import { MatchingRecord, useFindPaymentRecord } from './find-payment-record.hook';

type FindPaymentRecordDialogProps = {
    /**
     * The record edit the details of.
     */
    payment: any;

    /**
     * Action to call when the modal closes.
     */
    onClose: (payment: any, matchingRecord: MatchingRecord) => void;
};

export const FindPaymentRecordDialogComponent = ({ payment, onClose }: FindPaymentRecordDialogProps) => {
    const { matchingRecord } = useFindPaymentRecord(payment);

    const confirm = () => {
        onClose(payment, matchingRecord);
    };

    if (!payment) {
        return null;
    }

    return (
        <Dialog
            isShown={true}
            onCloseComplete={() => onClose(null, null)}
            preventBodyScrolling
            confirmLabel='Confirm Selection'
            title='Find Payment Record'
            onConfirm={confirm}
            shouldCloseOnOverlayClick={false}
        >
            <FormField label='Date' marginBottom={majorScale(3)}>
                <Text>{formatDateFull(payment.date)}</Text>
            </FormField>
            <FormField label='Matching Record' marginBottom={majorScale(3)}>
                {matchingRecord ? (
                    <Text>
                        {formatDateFull(matchingRecord.date as any)} - Debit: {matchingRecord.debit}
                    </Text>
                ) : (
                    <Text>No matching record found.</Text>
                )}
            </FormField>
            {/* TODO allow searching for the record. */}
            {/* <Autocomplete onChange={changedItem => setDetails(changedItem)} items={suggestions}>
                {props => {
                    const { getInputProps, getRef } = props;
                    const { onChange, ...inputProps } = getInputProps();
                    return (
                        <TextInputField
                            ref={getRef}
                            label='Details'
                            marginBottom={majorScale(3)}
                            autoFocus
                            {...inputProps}
                            // This overrides the value from inputProps and get's the appropriate
                            // value set since we want to be able to autocomplete or use a new value.
                            value={details}
                            // We need to set details as we type, because we want to use that as the value from the dialog.
                            // If we didn't then the autocomplete would only suggest values that it knows about.
                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                                setDetails(evt.target.value);
                                onChange(evt);
                            }}
                        />
                    );
                }}
            </Autocomplete> */}
        </Dialog>
    );
};

export const FindPaymentRecordDialog = React.memo(FindPaymentRecordDialogComponent);
