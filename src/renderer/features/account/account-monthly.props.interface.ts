import { IStore } from "../../store/store.interface";
import { IRecord } from "../../store/records/record.interface";
import { IAccountMonthlyRecord } from './account-monthly-record.interface';

export interface IAccountMonthlyProps extends
    IAccountMonthlyStateProps,
    IAccountMonthlyDispatchProps,
    IAccountMonthlyOwnProps {};

export interface IAccountMonthlyStateProps {
    /**
     * The records to display.
     */
    records: IAccountMonthlyRecord[];
}

export interface IAccountMonthlyDispatchProps {}

export interface IAccountMonthlyOwnProps {
    /**
     * The ID of the account to display.
     */
    accountId: string;

    /**
     * The first date of the month to get the data for.
     */
    date: string;

    /**
     * A selector to access the store to get the data 
     * for that specified month and account.
     */
    stateSelector: (state: IStore, accountId: string, date: string) => IRecord[];
}