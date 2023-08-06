import { IInvestmentRecord } from './investment-record.interface';

export class InvestmentRecordActions {
    public static ADD_RECORD = 'ADD_RECORD';
    public static DELETE_RECORD = 'DELETE_RECORD';

    public static addRecord = (record: IInvestmentRecord) => ({
        type: InvestmentRecordActions.ADD_RECORD,
        payload: record,
    });

    public static deleteRecord = (record: IInvestmentRecord) => ({
        type: InvestmentRecordActions.DELETE_RECORD,
        payload: record,
    });
}
