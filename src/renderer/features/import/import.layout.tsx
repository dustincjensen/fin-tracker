import * as React from 'react';
import { ActionPendingRecordsContainer } from './action-pending-records.container';
import { IImportLayoutProps } from './import.props.interface';
import { NewRecordsContainer } from './new-records.container';
import { PendingRecordsContainer } from './pending-records.container';
import './import.layout.scss';

export class ImportLayout extends React.Component<IImportLayoutProps> {
  public render() {
    const { hasPendingRecords } = this.props;
    return (
      <div className='imports'>
        {!hasPendingRecords && <NewRecordsContainer />}
        {hasPendingRecords && <ActionPendingRecordsContainer />}
        {hasPendingRecords && <PendingRecordsContainer />}
      </div>
    );
  }
}
