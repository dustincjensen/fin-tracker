import * as React from 'react';
// TODO remove dependency
import { IRecord } from '../../store/records/record.interface';

export interface IActionPendingRecordsStateProps {
    startingBalance: number;
    newRecords: IRecord[];
    existingRecords: IRecord[];
}
export interface IActionPendingRecordsDispatchProps {
    accept: (startingBalance: number, newRecords: IRecord[], existingRecords: IRecord[]) => void;
    clear: () => void;
}
export interface IActionPendingRecordsProps extends IActionPendingRecordsStateProps, IActionPendingRecordsDispatchProps { }

export class ActionPendingRecords extends React.Component<IActionPendingRecordsProps> {
    public render() {
        const {
            startingBalance,
            newRecords,
            existingRecords,
            accept,
            clear
        } = this.props;
        return (
            <div>
                <button className="btn btn-primary" onClick={() => accept(startingBalance, newRecords, existingRecords)}>Accept</button>
                <button className="btn btn-danger" onClick={() => clear()}>Clear</button>
            </div>
        );
    }
}