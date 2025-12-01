import { Dialog, FormField, majorScale, TextInputField, Text, Autocomplete } from 'evergreen-ui';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Record } from '../../models/record.type';
import { setDetails as setDetailsAction } from '../../store/record/record-slice';
import { useEditDetails } from './edit-details.hook';

type EditDetailsProps = {
    /**
     * The record edit the details of.
     */
    record: Record;

    /**
     * Action to call when the modal closes.
     */
    onClose: () => void;
};

export const EditDetailsDialogComponent = ({ record, onClose }: EditDetailsProps) => {
    const dispatch = useDispatch();
    const [details, setDetails] = React.useState<string>('');
    const { suggestions } = useEditDetails();

    React.useEffect(() => {
        setDetails(record?.details || '');
    }, [record]);

    if (!record) {
        return null;
    }

    const confirm = () => {
        dispatch(setDetailsAction({ accountId: record.accountId, recordId: record.id, details }));
        onClose();
    };

    return (
        <Dialog
            isShown={true}
            onCloseComplete={onClose}
            preventBodyScrolling
            confirmLabel='Save Details'
            title='Edit Details'
            onConfirm={confirm}
            shouldCloseOnOverlayClick={false}
        >
            <FormField label='Description' marginBottom={majorScale(3)}>
                <Text>{record.description}</Text>
            </FormField>
            <Autocomplete onChange={changedItem => setDetails(changedItem)} items={suggestions}>
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
            </Autocomplete>
        </Dialog>
    );
};

export const EditDetailsDialog = React.memo(EditDetailsDialogComponent);
