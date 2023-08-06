import { IRecord } from '../../../store/record/record.interface';

export interface IDeleteSplitRecordsProps {
    /**
     * The record to delete the split records from.
     */
    record: IRecord;

    /**
     * Action to call when the modal closes.
     */
    onClose: () => void;
}
