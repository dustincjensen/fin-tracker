import { IRecord } from '../../../store/record/record.interface';

export interface IEditDetailsProps {
    /**
     * The record edit the details of.
     */
    record: IRecord;

    /**
     * Action to call when the modal closes.
     */
    onClose: () => void;
}
