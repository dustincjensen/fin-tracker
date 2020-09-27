import { Dialog, FormField, majorScale, TextInputField, Text } from 'evergreen-ui';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { RecordActions } from '../../../store/record/record.actions';
import { IEditDetailsProps } from './edit-details.props.interface';

export const EditDetailsDialog = ({ record, onClose }: IEditDetailsProps) => {
  const dispatch = useDispatch();
  const [details, setDetails] = React.useState<string>('');

  React.useEffect(() => {
    setDetails(record?.details || '');
  }, [record]);

  if (!record) {
    return null;
  }

  const confirm = () => {
    dispatch(RecordActions.setDetails(record.accountId, record.id, details));
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
