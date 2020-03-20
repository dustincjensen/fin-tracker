import { Button, majorScale, Pane } from 'evergreen-ui';
import * as React from 'react';
import { IRecord } from '../../store/record/record.interface';

export interface IActionPendingRecordsStateProps {
  startingBalance: number;
  newRecords: IRecord[];
  existingRecords: IRecord[];
}
export interface IActionPendingRecordsDispatchProps {
  accept: (startingBalance: number, newRecords: IRecord[], existingRecords: IRecord[]) => void;
  clear: () => void;
}
export interface IActionPendingRecordsProps
  extends IActionPendingRecordsStateProps,
    IActionPendingRecordsDispatchProps {}

export class ActionPendingRecords extends React.Component<IActionPendingRecordsProps> {
  public render() {
    const { startingBalance, newRecords, existingRecords, accept, clear } = this.props;
    return (
      <Pane display='flex' justifyContent='space-around'>
        <Button
          appearance='primary'
          intent='success'
          iconBefore='tick'
          height={majorScale(5)}
          onClick={() => accept(startingBalance, newRecords, existingRecords)}
        >
          Accept Records
        </Button>
        <Button appearance='primary' intent='danger' iconBefore='cross' height={majorScale(5)} onClick={() => clear()}>
          Clear Records
        </Button>
      </Pane>
    );
  }
}
