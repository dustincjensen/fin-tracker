import { Record } from '../../../models/record.type';

export interface IDeleteSplitRecordsProps {
    /**
     * The record to delete the split records from.
     */
    record: Record;

    /**
     * Action to call when the modal closes.
     */
    onClose: () => void;
}
