import { IAccount } from '../../../store/account/account.interface';

export interface IEditAccountProps {
    /**
     * The optional text for the header.
     */
    headerText?: string;

    /**
     * The text for the save button.
     */
    saveButtonText: string;

    /**
     * Whether or not the complex fields can be edited.
     * Complex fields are ones that would affect all records
     * in the account.
     * - Starting Year
     * - Starting Month
     * - Starting Balance
     * - Account Type
     * These will only be editable on a new account until advanced
     * editing is available.
     */
    canEditComplexFields: boolean;

    /**
     * Action to save an account.
     */
    saveAccount: (account: IAccount) => void;

    /**
     * The existing account if available.
     */
    account?: IAccount;

    /**
     * The current balance of the account if available.
     */
    currentBalance?: number;

    /**
     * The year and month of the latest transaction.
     */
    lastTransactionDate?: [number, number];

    /**
     * A function when invoked will close the account section.
     */
    close?: () => void;

    /**
     * True if the account is new (editing).
     */
    isNew?: boolean;

    /**
     * Function to call to archive the account.
     */
    archiveAccount?: (id: string, archived: boolean, endYear: number, endMonth: number) => void;
}
