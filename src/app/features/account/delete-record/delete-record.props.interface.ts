import { Record } from '../../../models/record.type';

export interface IDeleteRecordProps {
    /**
     * The record to delete.
     */
    record: Record;

    /**
     * Action to call when the modal closes.
     */
    onClose: () => void;
}
