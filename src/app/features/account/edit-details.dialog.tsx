import { Dialog, FormField, majorScale, TextInputField, Text } from 'evergreen-ui';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Record } from '../../models/record.type';
import { setDetails as setDetailsAction } from '../../store/record/record-slice';

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
            <TextInputField
                label='Details'
                value={details}
                marginBottom={majorScale(3)}
                onChange={evt => setDetails(evt.target.value)}
            />
        </Dialog>
    );
};

export const EditDetailsDialog = React.memo(EditDetailsDialogComponent);
