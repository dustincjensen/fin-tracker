import { IInvestmentRecord } from './investment-record.interface';

export interface IInvestmentRecordStore {
    /**
     * Records keyed by the account they belong to.
     */
    records: { [accountId: string]: IInvestmentRecord[] };
}
