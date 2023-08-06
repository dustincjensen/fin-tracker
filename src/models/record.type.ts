import { SplitRecord } from './split-record.type';

export type Record = {
    /**
     * The ID of the record.
     */
    id: string;

    /**
     * The ID of the account the record belongs to.
     */
    accountId: string;

    /**
     * The date the record took place.
     */
    date: string;

    /**
     * The description of the record.
     */
    description: string;

    /**
     * Custom details the user can add to explain the transaction in better detail.
     */
    details?: string;

    /**
     * If this record needs to be split into multiple.
     */
    splitRecords?: SplitRecord[];

    /**
     * The ID of the category for this record.
     */
    categoryId?: string;

    /**
     * The ID of the category this was automatically assigned.
     * This will be ignored if the record has splitRecords.
     */
    autoCategoryId?: string;

    /**
     * The debit of the record.
     */
    debit?: number;

    /**
     * The credit of the record.
     */
    credit?: number;

    /**
     * The balance of the account up to and including this record.
     */
    balance?: number;

    /**
     * True if the record was manually entered by the user.
     */
    isManualEntry?: boolean;
};
