import { Record } from '../../../models/record.type';

export interface IEditDetailsProps {
    /**
     * The record edit the details of.
     */
    record: Record;

    /**
     * Action to call when the modal closes.
     */
    onClose: () => void;
}
